import Spotify from 'spotify-web-api-js';
import database from '../database.js';
// import player from '../spotifyPlayer.js'
const spotifyApi = new Spotify();

let roomId = null;
let songList = [];
let userId = null;
let isHost = false;
let activeDevice = null;

// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';
export const GETSONGS_BEGIN = 'GETSONGS_BEGIN';
export const GETSONGS_END = "GETSONGS_END";
export const ADD_SONGS = "ADD_SONGS";
export const UPDATE_VOTE = "UPDATE_VOTE";
export const REMOVE_SONGS = 'REMOVE_SONGS';
export const CHANGE_CURRENTSONG = "CHANGE_CURRENTSONG";
export const SET_ROOMNAME = "SET_ROOMNAME";
export const JOIN_ROOMNAME = "JOIN_ROOMNAME";
export const TOGGLE_SONG = "TOGGLE_SONG";
export const DEVICES = "DEVICES";


// set the access tokens for the api
export function setTokens({accessToken, refreshToken}) {
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
  }
  return { type: SPOTIFY_TOKENS, accessToken, refreshToken };
}



function refreshToken(callback){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      spotifyApi.setAccessToken(this.responseText)
      callback()
    }
  };
  xhr.open('GET', '/refreshToken', true);
  xhr.send();
}

// function to change to the next song
export function nextSong(){  
      if(songList.length <= 0){
        spotifyApi.pause({})
        database.ref(roomId+'/currentlyPlaying/').set({
          songInfo: {
            SongName: 'none',
            artist: ['None'],
            time: '4:20',
            picture: null,
          }
        })
      }
      else{
        let orderedlist =[];
        database.ref(roomId+'/songs/').once('value').then(snapshot => {
          orderedlist = Object.values(snapshot.val());
          orderedlist.sort(function(a,b) {
            return b.votecount - a.votecount;
        });
        (function play() {spotifyApi.play({"uris": [orderedlist[0].uri], "device_id": activeDevice.id}).then((res) => {   
            
            database.ref(roomId+'/currentlyPlaying/').set({
              songInfo: orderedlist[0]
            })
          }).catch(e => {
            console.error(e, "this is the expired message")
            if(e.status === 401){
                refreshToken(play)
            }
          })
        })()
        database.ref(roomId+'/songs/' + orderedlist[0].songId).remove() 
        });
      }
  }

export function deleteSong(songId, accountId){
    if(isHost || userId === accountId){
      return database.ref(roomId + '/songs/' + songId).remove().then((res) => {return true})
    }
    else{
      return Promise.resolve(false)
    }
}




export function watchSongRemoved(dispatch){
  database.ref(roomId+'/songs').on('child_removed', function(snapshot){
    for(let i = 0; i < songList.length; i++){
      if(songList[i].songId === snapshot.val().songId){
        songList.splice(i, 1)
      }
    }
    dispatch({ type: REMOVE_SONGS, data: songList});
  });
}

export function watchSongChange(dispatch) {
  database.ref(roomId+'/currentlyPlaying').on('child_changed', (snapshot) => {
    for(let i = 0; i < songList.length; i++){
      if(songList[i].songId === snapshot.val().songId){
        songList.splice(i, 1)
      }
    }
    songList.sort(function(a, b){
      return b.votecount-a.votecount
    })
    dispatch({ type: REMOVE_SONGS, data: songList});
    dispatch({ type: CHANGE_CURRENTSONG, data: snapshot.val()});
  });
}

//resume song if something is playing, else start the playlist
export function resume(){
  return dispatch => {
    database.ref(roomId+'/currentlyPlaying/songInfo/SongName').once('value').then(snapshot => {
      if(snapshot.val() !== 'none'){
        spotifyApi.play({})
      }
      else{
        nextSong()
      }
      dispatch({type: TOGGLE_SONG, data: true})
    })
  } 
}

function parseSongList(data, songs){
  // console.log(data)
  return data.items.map(function(info){
        if(info.id in songs){
          return Object.assign ({}, info, {
            added: songs[info.id].adder
          })
        }
        return Object.assign({}, info, {
          added: false
        }) 
    })
}

function parseSongListPlaylist(data,songs){
    console.log(songs)
    return data.items.map(function(info){
      if(info.track.id in songs){
        return Object.assign ({}, info.track, {
          added: songs[info.track.id].adder
        })
      }
      return Object.assign({}, info.track, {
        added: false
      }) 
  })
}

export function getSongsDb(){
  return database.ref(roomId+'/songs/').once('value').then(snapshot => {
    const res = snapshot.val()
    if(res){
      return res
    }
    return {}
  })
}


//search for a song and return the results
export function search(query){
  let songs;
  getSongsDb().then((response) => {
    songs = response
  })
  return spotifyApi.search(query, 'track').then(function(data){
        const ret = parseSongList(data.tracks, songs)
        return ret
    }).catch(e => {
       console.error(e, "this is the expired message")
          if(e.status === 401){
              refreshToken(null)
      }
    });  
}

export function returnTopChart(songs, owner, id){
  return spotifyApi.getPlaylistTracks(owner, id, {'limit':10}).then(function(data){
      // console.log(data)
      const ret = parseSongListPlaylist(data, songs)
      return ret
    }).catch(e => {
        console.error(e, "this is the expired message")
        if(e.status === 401){
            refreshToken()
        }
    })
}

export function getSuggestions(songs){
    // let songs = {}
    // getSongsDb().then((response) => {
    //   songs = response
    // })
    return spotifyApi.getMyTopTracks({'limit':10}).then(function(data){
      // console.log(data)
      const ret = parseSongList(data, songs)
      return ret
    }).catch(e => {
        console.error(e, "this is the expired message")
          if(e.status === 401){
              refreshToken(getSuggestions)
          }
      })
  }

//pause the song and set it to false
export function pause(){
  return dispatch => {
    spotifyApi.pause({}).catch(e => {
      console.error(e, "this is the expired message")
      if(e.status === 401){
          refreshToken(pause)
      }
  })
    database.ref(roomId+'/isPlaying/').set({
        isPlaying: false
    })
    dispatch({type: TOGGLE_SONG, data: false})
  }
}

//listener for when song is removed


//skip the song 
export function skip(){
   nextSong()
}

// listener for when song is added 
export function watchGuestAddedEvent(dispatch) {
  database.ref(roomId+'/songs').on('child_added', function(snapshot){
    songList.push(snapshot.val())
    dispatch({ type: ADD_SONGS, data: songList});
  });
}


// listener for when vote changed
export function voteListener(dispatch) {
  database.ref(roomId+'/songs/').on('child_changed', (snapshot) => {
    for(var i = 0; i < songList.length; i++){
      if(songList[i].songId === snapshot.val().songId){
        songList[i] = snapshot.val()
        dispatch({ type: UPDATE_VOTE, data: snapshot.val(), index: i});
      }
    }
  });
}

// function when room is created
export function createDB(roomName){
  return dispatch => {
    return database.ref('/').once('value').then(snapshot => {
        if(snapshot.val() && roomName in snapshot.val()){
          return false
        }
        isHost = true;
        roomId = roomName;
        database.ref(roomId + '/people').set({
          host: userId
        })
        database.ref(roomId+ '/currentlyPlaying').set({
          songInfo:{
            SongName: 'none',
            artist: ['None'],
            time: '4:20',
            picture: null,
          }
        })
        dispatch({type : SET_ROOMNAME, data: roomId})
        return true
    }) 
  }
}

// get the available devices to be connected to
export function getDevices(){
  return spotifyApi.getMyDevices().then((devices) => {
    return devices.devices
  }).catch(e => {
      console.error(e, "this is the expired message")
      if(e.status === 401){
          refreshToken(getDevices)
      }
  })
}

// switch the current device to this 
export function changeDevice(device){
  return dispatch => {
    return spotifyApi.transferMyPlayback([device.id]).then(() => {
      activeDevice = device
      dispatch({type: DEVICES, data: activeDevice}) 
    }).catch(e => {
        console.error(e, "this is the expired message")
        if(e.status === 401){
            refreshToken(changeDevice)
        }
    })
      
  }
}

// set the active device to the first one in the list
export function setDefaultDevice(){
    return dispatch => {
      spotifyApi.getMyDevices().then(function(devices){
      if(devices){
        for(let i = 0; i < devices.devices.length; i++){
          if(devices.devices[i].name === 'Crowdplay Web Player'){
            activeDevice = devices.devices[i]
            spotifyApi.transferMyPlayback([activeDevice.id], {play: false}).catch(e => {
                console.error(e, "this is the expired message")
                if(e.status === 401){
                    refreshToken()
                }
            }) 
            dispatch({type: DEVICES, data: activeDevice})
            return
          }
        }
        activeDevice = devices.devices[0]
      }
      else{
        activeDevice = null;
      }
      })
    }

}

// run this function for someone joining a room
export function joinDB(roomName){
  return dispatch => {
    return database.ref('/').once('value').then(snapshot => {
        const rooms = snapshot.val()
        if(snapshot.val() && roomName in rooms){
          roomId = roomName;
          database.ref(roomId+'/currentlyPlaying/songInfo/').once('value').then(snapshot => {
             dispatch({ type: CHANGE_CURRENTSONG, data: snapshot.val()});
          })
          database.ref(roomId+'/isPlaying/').once('value').then(snapshot => {
             dispatch({ type: TOGGLE_SONG, data: snapshot.val()});
          })
          if(userId == rooms[roomName].people.host){
            isHost = true;
            dispatch({type : SET_ROOMNAME, data: roomId})
            return true
          }
          else{
            dispatch({type : JOIN_ROOMNAME, data: roomId})
            return true
          }
        }
        return false
    }) 
  }
}

// add song to the database
export function postSong(name, artist, time, picture, id, uri){

    if (songList.length > 14){
      return Promise.resolve(false)
    }
    return database.ref(roomId + '/songs/'+ id).set({
              SongName:name,
              artist:artist,
              time:time,
              picture:picture,
              songId:id,
              uri:uri,
              upvote: 'Empty',
              votecount: 1,
              voters: {[userId]: true},
              adder: userId
            })
          
    }
          


// order the songs in the database and return it
export function orderSongs(){
   return dispatch => {
         let orderedlist = [];
        dispatch({ type: GETSONGS_BEGIN});
        return database.ref(roomId + '/songs/').once('value').then(snapshot => {
          orderedlist = Object.values(snapshot.val());
          // console.log(orderedlist)
          orderedlist.sort(function(a,b) {
            return b.votecount - a.votecount;
          });
          songList = orderedlist
          dispatch({ type: GETSONGS_END, data: songList });
        }).catch(e => {
          dispatch({ type: GETSONGS_END, data: songList });
        });
    
  }
}

//increment vote
export function increment(id, user_id3){

  var ref = database.ref(roomId+'/songs/' + id);
  database.ref(roomId+'/songs/'+ id).once('value').then(function(snapshot){
    const song = snapshot.val()
    ref.transaction(function(song) {
      if (song) {

        if (song.voters && song.voters[userId]) {
          song.votecount--;
          song.voters[userId] = false;
          // console.log('THISFAR')
        } else {
          song.votecount++;
          if (!song.voters) {
            song.voters = {};
          }
          song.voters[userId] = true;
        }
      }
      return song
  });

  })
}


/* get the user's info from the /me api */
export function getMyInfo() {
  return dispatch => {
    dispatch({ type: SPOTIFY_ME_BEGIN});
    spotifyApi.getMe().then(function(data){
      dispatch({ type: SPOTIFY_ME_SUCCESS, data: data });
      userId = data.id.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    })
    .catch(e => {
      dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
    });
  };
}


