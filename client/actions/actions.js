import Spotify from 'spotify-web-api-js';
import database from '../database.js';
const spotifyApi = new Spotify();

let roomId = null;
let songList = [];
let userId = null;
let activeDevice = null;
let deleted = false;

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

// function that runs in the background to keep checking the timestamp on the song playing
const refresh = function(){
     spotifyApi.getMyCurrentPlayingTrack().then(function(data){
      if(data.item.duration_ms - data.progress_ms < 5500){
        setTimeout(function(){
         nextSong()
          }, data.item.duration_ms - data.progress_ms - 500);
      }
      else{
        setTimeout(refresh, 5000);
      }
     })
}

export function deleteSong(songId){
  console.log('delete started')
  deleted = true
  console.log(deleted)
  database.ref(roomId + '/songs/' + songId).remove()
  
}

// function to change to the next song
export function nextSong(context){    
      clearTimeout(refresh)
      let orderedlist =[];
      database.ref(roomId+'/songs/').once('value').then(snapshot => {
      const aux = snapshot.val()
      if(aux){
          orderedlist = Object.values(aux);
          orderedlist.sort(function(a,b) {
            return b.votecount - a.votecount;
        });
        spotifyApi.play({"uris": [orderedlist[0].uri], "device_id": activeDevice.id}).then((res) => {
            database.ref(roomId+'/currentlyPlaying/').set({
              songInfo: orderedlist[0]
            })
            setTimeout(refresh, 5000)
          }).catch(e => {
            console.log('CAUGHT SOME ERROR', e)
        })
        database.ref(roomId+'/songs/' + orderedlist[0].songId).remove() 
        database.ref(roomId+'/numOfSongs').transaction(function(numOfSongs){
          return numOfSongs = numOfSongs - 1
        })
      }
      //show no song remaining
      else{
          spotifyApi.pause({})
          database.ref(roomId+'/currentlyPlaying/').set({
            songInfo: null
          })
          database.ref(roomId + '/songs/'+ 'noSong').set({
              SongName: "No song Chosen",
              artist:'noArtist',
              time:'4:20',
              picture:null,
              songId:null,
              uri:null,
              upvote: 'Empty',
              votecount: 1,
              voters: {[userId]: true}
          }).then(() => {
            database.ref(roomId+'/songs/' +'noSong').remove() 
          })
      }
      }).catch(e => {
          console.log(e)
      });
    
}

//resume song if something is playing, else start the playlist
export function resume(){
  return dispatch => {
    database.ref(roomId+'/currentlyPlaying/').once('value').then(snapshot => {
      if(snapshot.val()){
        spotifyApi.play({})
      }
      else{
        nextSong()
      }
      dispatch({type: TOGGLE_SONG, data: true})
    })
  } 
}

//search for a song and return the results
export function search(query){
  let songs = {};
  database.ref(roomId+'/songs/').once('value').then(snapshot => {
    const res = snapshot.val()
    if(res)
      {songs = snapshot.val()}
  })
  return spotifyApi.search(query, 'track').then(function(data){
      let ret = data.tracks.items.map(function(info){
        if(info.id in songs){
          return Object.assign ({}, info, {
            added: true
          })
        }
        return Object.assign({}, info, {
          added: false
        }) 
      })
      return ret
    }).catch(e => {
     
    });  
}

//pause the song and set it to false
export function pause(){
  return dispatch => {
    spotifyApi.pause({})
    database.ref(roomId+'/isPlaying/').set({
        isPlaying: false
    })
    dispatch({type: TOGGLE_SONG, data: false})
  }
}

//listener for when song is removed
export function watchChildRemoved(dispatch) {
  database.ref(roomId+'/songs/').on('child_removed', (snapshot) => {
    console.log('remove detected')
    for(let i = 0; i < songList.length; i++){
      if(songList[i].songId === snapshot.val().songId){
        songList.splice(i, 1)
      }
    }
    songList.sort(function(a, b){
      return b.votecount-a.votecount
    })
    dispatch({ type: REMOVE_SONGS, data: songList});
    if(deleted){
      deleted = false  
    }
    else{
      dispatch({ type: CHANGE_CURRENTSONG, data: snapshot.val()});
    }
  });
}

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
        roomId = roomName;
        database.ref(roomId).set({
          numOfSongs:0,
        })
        database.ref(roomId + '/people').set({
          host: userId
        })
        
        // console.log(spotifyApi)
        setDefaultDevice().then(() => {
          dispatch({type: DEVICES, data: activeDevice})
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
  })
}

// switch the current device to this 
export function changeDevice(device){
  return dispatch => {
    return spotifyApi.transferMyPlayback([device.id]).then(() => {
      activeDevice = device
      dispatch({type: DEVICES, data: activeDevice}) 
    })
      
  }
}

// set the active device to the first one in the list
function setDefaultDevice(){
    return spotifyApi.getMyDevices().then(function(devices){
      if(devices){
        for(let i = 0; i < devices.devices.length; i++){
          if(devices.devices[i].is_active){
            activeDevice = devices.devices[i]
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
            setDefaultDevice().then(() => {
              dispatch({type: DEVICES, data: activeDevice});
            })
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
    return database.ref(roomId + '/numOfSongs').once('value').then(snapshot => {
      if(snapshot.val() < 15){
        database.ref(roomId + '/songs/'+ id).set({
          SongName:name,
          artist:artist,
          time:time,
          picture:picture,
          songId:id,
          uri:uri,
          upvote: 'Empty',
          votecount: 1,
          voters: {[userId]: true}
        })
        database.ref(roomId+'/numOfSongs').transaction(function(numOfSongs){
          return numOfSongs = numOfSongs + 1
        })
      }
      else{
        return false
      }
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

        if (song.voters && song.voters[user_id3]) {
          song.votecount--;
          song.voters[user_id3] = false;
          // console.log('THISFAR')
        } else {
          song.votecount++;
          if (!song.voters) {
            song.voters = {};
          }
          song.voters[user_id3] = true;
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
      userId = data.id
    })
    .catch(e => {
      dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
    });
  };
}


