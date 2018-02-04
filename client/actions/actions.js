import Spotify from 'spotify-web-api-js';
import database from '../database.js';
// import SpotifyWebHelper from 'spotify-web-helper';
// const helper = SpotifyWebHelper();
import { dispatch } from 'redux';

const spotifyApi = new Spotify();

// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';
export const SPOTIFY_SEARCH_LOADING = 'SPOTIFY_SEARCH_LOADING';
export const SPOTIFY_SEARCH_DONE = 'SPOTIFY_SEARCH_DONE';
export const GETSONGS_BEGIN = 'GETSONGS_BEGIN';
export const GETSONGS_END = "GETSONGS_END";
export const ADD_SONGS = "ADD_SONGS";
export const ADD_SONGS_DONE = "ADD_SONGS_DONE";
export const SONGS = 'SONGS';
export const UPDATE_VOTE = "UPDATE_VOTE";
export const TOGGLE_LOADSONGS = 'TOGGLE_LOADSONGS';
export const PLAYBACK_PLAYING = 'PLAYBACK_PLAYING';
export const REMOVE_SONGS = 'REMOVE_SONGS';
export const CHANGE_CURRENTSONG = "CHANGE_CURRENTSONG";
export const SET_ROOMNAME = "SET_ROOMNAME";
export const JOIN_ROOMNAME = "JOIN_ROOMNAME";
export const TOGGLE_SONG = "TOGGLE_SONG";
export const DEVICES = "DEVICES";
/** set the app's access and refresh tokens */
export function setTokens({accessToken, refreshToken}) {
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
  }
  return { type: SPOTIFY_TOKENS, accessToken, refreshToken };
}


const refresh = function(){
     spotifyApi.getMyCurrentPlayingTrack().then(function(data){
      console.log(data)
      if(data.item.duration_ms - data.progress_ms < 7500){
        setTimeout(function(){
         nextSong()
          }, 500);
      }
      else{
        setTimeout(refresh, 5000);
      }
     })
}

export function nextSong(context){    
      clearInterval(refresh)
      let orderedlist =[];
      database.ref(roomId+'/songs/').once('value').then(snapshot => {
      let aux = snapshot.val()
      // console.log(snapshot.val(), 'AHHHHHHHHH')
      if(aux){
          orderedlist = Object.values(aux);
          orderedlist.sort(function(a,b) {
            return b.votecount - a.votecount;
        });
        spotifyApi.play({"uris": [orderedlist[0].uri]}).then((res) => {
            database.ref(roomId+'/currentlyPlaying/').set({
              songInfo: orderedlist[0]
            })
            setTimeout(refresh, 5000)
          }).catch(e => {
            console.log('CAUGHT SOME ERROR')
            console.log(e)
        })
        database.ref(roomId+'/songs/' + orderedlist[0].songId).remove() 
      }
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

export function play(){
  return dispatch => {
    database.ref(roomId+'/isPlaying/').set({
        isPlaying: true
    })
    dispatch({type: TOGGLE_SONG, data: true})
   return nextSong()
  }

}

export function resume(){
  return dispatch => {
    database.ref(roomId+'/currentlyPlaying/').once('value').then(snapshot => {
      const res = snapshot.val()
      if(res){
        spotifyApi.play({})
        dispatch({type: TOGGLE_SONG, data: true})
      }
      else{
        nextSong()
        dispatch({type: TOGGLE_SONG, data: true})
      }
    })
  } 
}

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

export function pause(){
  return dispatch => {
    spotifyApi.pause({})
    database.ref(roomId+'/isPlaying/').set({
        isPlaying: false
    })
    dispatch({type: TOGGLE_SONG, data: false})
  }
 
}

let updateArr = [];
let roomId = null;
let songList = [];
let userId = null;
let activeDevice = null

export function watchChildRemoved(dispatch) {
  database.ref(roomId+'/songs/').on('child_removed', (snapshot) => {
    for(let i = 0; i < songList.length; i++){
      if(songList[i].songId === snapshot.val().songId){
        songList.splice(i, 1)
      }
    }
    dispatch({ type: REMOVE_SONGS, data: songList});
    dispatch({ type: CHANGE_CURRENTSONG, data: snapshot.val()});
  });
}




// export function watchChildRemovedJoin(dispatch) {
//   database.ref(roomId+'/songs/').on('child_removed', (snapshot) => {
//     console.log('CHILD REMOVED', updateArr)
//     dispatch({ type: REMOVE_SONGS, data: updateArr});
//     dispatch({ type: CHANGE_CURRENTSONG, data: snapshot.val()});
//   });
// }

function sort(arr){

}

export function skip(){
   nextSong()
}


// initial call, or just call refresh directly
// setTimeout(refresh, 5000);
// const config = {
//   apiKey: "AIzaSyCWfDeoXue1YnVRZGXiy9q3M2A2-PknkbY",
//   authDomain: "nextup-9685a.firebaseapp.com",
//   databaseURL: "https://nextup-9685a.firebaseio.com",
//   projectId: "nextup-9685a",
//   storageBucket: "nextup-9685a.appspot.com",
//   messagingSenderId: "11444832309"
// };

// firebase.initializeApp(config);
// const database = database;





    // database.ref('/').on('child_changed', function(snapshot){
    //    console.log('CHANGED',snapshot.val())
 
    //    // dispatch({type: GETSONGS_END, data: 'blah'})
    // })

// database.ref('/').on('child_added', function(snapshot){
//     console.log('ADDED',snapshot.val())
//  })
export function addSongsDone(){
  return dispatch =>{
    dispatch({ type: ADD_SONGS_DONE});
  }
  
}

export function watchGuestAddedEvent(dispatch) {

//   var ref = db.ref("dinosaurs");
//   ref.orderByChild("height").on("child_added", function(snapshot) {
//   console.log(snapshot.key + " was " + snapshot.val().height + " meters tall");
// });
  database.ref(roomId+'/songs').on('child_added', function(snapshot){
    songList.push(snapshot.val())
    dispatch({ type: ADD_SONGS, data: songList});
    // console.log('CHILD HAS BEEN ADDED', snapshot.val())
  });
}



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

export function createDB(roomName){
  return dispatch => {
    return database.ref('/').once('value').then(snapshot => {
        if(snapshot.val() && roomName in snapshot.val()){
          return false
        }
        roomId = roomName;
        database.ref(roomId + '/people').set({
          host: userId
        })
        setDefaultDevice().then(() => {
          dispatch({type: DEVICES, data: activeDevice})
        })
        dispatch({type : SET_ROOMNAME, data: roomId})
        return true
    }) 
  }
}

export function getDevices(){
  return spotifyApi.getMyDevices().then((devices) => {
    return devices.devices
  })
}

export function changeDevice(device){
  return dispatch => {
    spotifyApi.transferMyPlayback([device.id])
    activeDevice = device
    dispatch({type: DEVICES, data: activeDevice})
  }
}

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

// export function addSongToQueue(){
//   spotifyApi.addTracksToPlaylist(userId, playlistId, orderedlist[0].uri).then(()=> nextSong())
// }

export function postSong(name, artist, time, picture, id, uri){
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
}



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

export function toggleLoadSongs(){
   return dispatch => {
        dispatch({ type: TOGGLE_LOADSONGS});
  }
}


  // database.ref(roomId + '/songs/').on('child_changed', function(snapshot){
  //   return dispatch => {
  //     // console.log(snapshot.val())
  //     dispatch({ type: SONGS, data: snapshot.val() });
  //   }
  // })
// function update(aux){
//   console.log(aux)
//   return dispatch => {
//     dispatch({ type: SPOTIFY_ME_BEGIN});
//     dispatch({ type: SPOTIFY_ME_SUCCESS, data: aux });
//   }
// }
// const fromDb = (db, dispatch) => {
//   db.ref('/songs/').on('value', data => {
//     console.log('1')
//     if (data.val()) {
//       console.log('dasd')
//       dispatch({ type: 'SET_MESSAGE', payload: data.val() });
//     }
//   });
// };
// fromDb(database, dispatch)

// export function getNumOfSongs(uri){
//   let orderedlist = [];
//    database.ref('/songs/').once('value').then(function(snapshot){
//       orderedlist = Object.values(snapshot.val());
//       orderedlist.sort(function(a,b) {
//          return b.votecount - a.votecount;
//       })
//       // dispatch({ type: SONGS, data: [orderedlist] });
//       console.log(snapshot.val(), orderedlist)
//       // if(!orderedlist){
//       // spotifyApi.addTracksToPlaylist(userId, playlistId, uri)
//       // }
//   })
// }

// let num;
// export function getNum(){
//   let val;
//    database.ref('/songs/').once('value').then(function(snapshot){
//       console.log(snapshot.val())
//       if (snapshot.val() == null){
//         return 'fdsfndksflnd'
//       }

//     })
// }



export function order(){
    let orderedlist = [];
    return  database.ref(roomId+ '/songs/').once('value').then(function(snapshot){
        orderedlist = Object.values(snapshot.val());
        orderedlist.sort(function(a,b) {
          return b.votecount - a.votecount;
        });
        return orderedlist
  });
}





// function orderSongs(){
//   let orderedlist = [];
//     // dispatch({ type: SPOTIFY_SEARCH_LOADING});
//     database.ref('/songs/').once('value').then(function(snapshot){
//       orderedlist = Object.values(snapshot.val());
//       orderedlist.sort(function(a,b) {
//          return b.votecount - a.votecount;
//       })
     
//     })
//     return orderedlist
// }


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

// export function createPlaylistContain(name){
//   function getPlaylists(){
//     spotifyApi.getUserPlaylists(userId, {limit:5}).then(function(data){
//       database.ref('playlist/').set({
//             playlistId: data.items[0].id,
//             uri: data.items[0].uri,
//             hostId: userId,
//             playing: false
//           })
//       playlistId = data.items[0].id;
//       playlistUri = data.items[0].uri
//     })
//   }
//     function createPlaylist(){
//       console.log('created')
//       spotifyApi.createPlaylist(userId, {
//       "name": name,
//       "description": "osafndsf",
//       "collaborative": true,
//       "public": false
//     }).then(() => getPlaylists())
//   }
//   createPlaylist()
// }
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



export function remove(id){
  database.ref(roomId+'/songs/' + id).remove();
}

// export function addToPlaylist(id, dummy, uri){
//   console.log(playlistId)
//   spotifyApi.addTracksToPlaylist(userId, playlistId, uri)
// }

// export function getEndOfSong(){
//   spotifyApi
// }


// export function getDevices() {

//   // console.log('CALLED')
//   spotifyApi.getMyDevices().then(function(data) {
//     devices = data
//     // console.log('win')
//     console.log(data)
//     // spotifyApi.pause(data)
//   })
//   .catch(e => {
//     dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
//   });
// }


// export function getDevices() {
//   return dispatch => {
//     dispatch({ type: SPOTIFY_ME_BEGIN});
//     spotifyApi.getMyDevices().then(function(data) {
//       devices = data
//       console.log(data)
//       // spotifyApi.pause(data)
//     })
//     .catch(e => {
//       dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
//     });

//   };

// }

// export function createPlaylist(){
//   return dispatch => {
//     dispatch({ type: SPOTIFY_ME_BEGIN});
//     spotifyApi.createPlaylist(id, {
//         "name": "testList2",
//         "description": "osafndsf",
//         "collaborative": true,
//         "public": true
//       })
//     .catch(e => {
//       dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
//     });

//   };
// }



// export function pause(){
//   cosnole.log('hello')
//   console.log(devices)
//   spotifyApi.pause(devices)
// }

export function getCurrent(){

  // spotifyApi.getMyCurrentPlaybackState().then(function(data){
  //   console.log(data)
  // })
  let details;
  return spotifyApi.getMyCurrentPlayingTrack().then(function(data){
      return [data.item, data.context.uri]
    })
    // console.log(details)
    // return details

}


    


// helper.player.on('ready', () => {
//   helper.player.on('end', () => { console.log('END')});


// });






// export function play(){
//   spotifyApi.play()
// }

// export function skip(){
//   spotifyApi.skipToNext(devices)
// }



// export function reorder(arr){
//   // spotifyApi.getPlaylistTracks(userId, playlistId).then(function(data){
//   //   console.log(data)
//   // })
//   // spotifyApi.reorderTracksInPlaylist(userId)
//   console.log(userId, playlistId, arr)
//   spotifyApi.replaceTracksInPlaylist(userId, playlistId, arr)
// }
// export function pause() {

//     spotifyApi.pause('fb677ab8ac3b1dd2f4aa34f6a70f3c9e4871f2b0')


// }




