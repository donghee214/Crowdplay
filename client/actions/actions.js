import Spotify from 'spotify-web-api-js';
import database from '../database.js';
// import { dispatch } from 'redux';

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
/** set the app's access and refresh tokens */
export function setTokens({accessToken, refreshToken}) {
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
  }
  return { type: SPOTIFY_TOKENS, accessToken, refreshToken };
}


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

let devices = null;
let userId = null;
let playlistId = null;
let playlistUri = null;


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
  database.ref('songs/').on('child_added', (snapshot) => {
    
    dispatch({ type: ADD_SONGS, data: snapshot.val()});
    console.log('CHILD HAS BEEN ADDED', snapshot.val())
  });




  // database.ref('/').on('child_changed', (snap) => {
  //   console.log('CHILD HAS BEEN CHANGED')
  //   // dispatch({ type: GETSONGS_END, data: 'orderedlist'});
  // });
}

export function voteListener(dispatch) {
  database.ref('songs/').on('child_changed', (snapshot) => {
    dispatch({ type: UPDATE_VOTE, data: snapshot.val()});
  });
}


export function test(){
  database.ref('people/' ).once('value').then(function (snapshot) {
  console.log(snapshot.val());
  })
}

export function addSongToQueue(){
  spotifyApi.addTracksToPlaylist(userId, playlistId, orderedlist[0].uri).then(()=> nextSong())
}

export function postSong(name, artist, time, picture, id, uri, userId){
    database.ref('songs/'+ id).set({
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
  // console.log('ran')
/*  database.ref('songs/').once('value').then(function(snapshot) {
      var num = snapshot.numChildren();
      if(num === 1){
        let orderedlist = [];
        orderedlist = Object.values(snapshot.val());
        console.log(orderedlist)
        orderedlist.sort(function(a,b) {
          return b.votecount - a.votecount;
        });
        // return dispatch =>{``
        //   dispatch({type: GETSONGS_END, data: orderedlist})
        // }
        
      }    
  });*/
}

function test1(){
  console.log("fsojfhsdjkfbd")
  return dispatch => {
    dispatch({ type: GETSONGS_END, data: 'orderedlist'});
  }
}

export function orderSongs(){

      // database.ref('playlist/').once('value').then(snapshot => {
      //    console.log('ORDERSONGS', snapshot.val())
      //           playlistId = snapshot.val().playlistId
      //           playlistUri = snapshot.val().uri
      //   })

   return dispatch => {
         let orderedlist = [];
        dispatch({ type: GETSONGS_BEGIN});
        return database.ref('songs/').once('value').then(snapshot => {
          orderedlist = Object.values(snapshot.val());
          // console.log(orderedlist)
          orderedlist.sort(function(a,b) {
            return b.votecount - a.votecount;
          });
          dispatch({ type: GETSONGS_END, data: orderedlist });
        }).catch(e => {
          dispatch({ type: GETSONGS_END, data: orderedlist });
        });
    
  }
}

export function toggleLoadSongs(){
   return dispatch => {
        dispatch({ type: TOGGLE_LOADSONGS});
  }
}


export function getVote(){
  database.ref('songs/').on('child_changed', function(snapshot){
    // console.log(snapshot.val())
  })

}

  database.ref('songs/').on('child_changed', function(snapshot){
    return dispatch => {
      console.log(snapshot.val())
      dispatch({ type: SONGS, data: snapshot.val() });
    }
  })
// function update(aux){
//   console.log(aux)
//   return dispatch => {
//     dispatch({ type: SPOTIFY_ME_BEGIN});
//     dispatch({ type: SPOTIFY_ME_SUCCESS, data: aux });
//   }
// }
// const fromDb = (db, dispatch) => {
//   db.ref('songs/').on('value', data => {
//     console.log('1')
//     if (data.val()) {
//       console.log('dasd')
//       dispatch({ type: 'SET_MESSAGE', payload: data.val() });
//     }
//   });
// };
// fromDb(database, dispatch)

export function getNumOfSongs(uri){
  let orderedlist = [];
   database.ref('songs/').once('value').then(function(snapshot){
      orderedlist = Object.values(snapshot.val());
      orderedlist.sort(function(a,b) {
         return b.votecount - a.votecount;
      })
      // dispatch({ type: SONGS, data: [orderedlist] });
      console.log(snapshot.val(), orderedlist)
      // if(!orderedlist){
      // spotifyApi.addTracksToPlaylist(userId, playlistId, uri)
      // }
  })
}

let num;
export function getNum(){
  let val;
   database.ref('songs/').once('value').then(function(snapshot){
      console.log(snapshot.val())
      if (snapshot.val() == null){
        return 'fdsfndksflnd'
      }

    })
}





export function DecrementVote(){
    SONG_ID = document.getElementById('songid').value;
    const user_id3 = '4314';

    database.ref('songs/' + SONG_ID + '/upvote/' + user_id3).once('value', snap => {
      let curr = snap.val()

      if(curr===true){
          console.log('nonregistered');
          database.ref('songs/' + SONG_ID + '/upvote').child(user_id3).set(false)
          database.ref('songs/' + SONG_ID + '/votecount').transaction(function(currentVote) {
          var newValue = currentVote -2;
          return newValue;
        })
      } else if (curr === false) {
        database.ref('songs/' + SONG_ID + '/upvote').child(user_id3).set(null)
        
        database.ref('songs/' + SONG_ID + '/votecount').transaction(function(currentVote) {
          var newValue = currentVote + 1;
          return newValue;
        })
      } else {
        database.ref('songs/' + SONG_ID + '/upvote').child(user_id3).set(false)
        database.ref('songs/' + SONG_ID + '/votecount').transaction(function(currentVote) {
        var newValue = currentVote -1;
        return newValue;
      }) 
      }
    })
  }

export function order(){
    let orderedlist = [];
    return  database.ref('songs/').once('value').then(function(snapshot){
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
//     database.ref('songs/').once('value').then(function(snapshot){
//       orderedlist = Object.values(snapshot.val());
//       orderedlist.sort(function(a,b) {
//          return b.votecount - a.votecount;
//       })
     
//     })
//     return orderedlist
// }

export function getId(){            
  return userId
}

export function increment(id, user_id3){

  var ref = database.ref('songs/' + id);
  database.ref('songs/'+ id).once('value').then(function(snapshot){
    const song = snapshot.val()
    ref.transaction(function(song) {
      if (song) {

        if (song.voters && song.voters[user_id3]) {
          song.votecount--;
          song.voters[user_id3] = false;
          console.log('THISFAR')
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

export function createPlaylistContain(name){
  function getPlaylists(){
    spotifyApi.getUserPlaylists(userId, {limit:5}).then(function(data){
      database.ref('playlist/').set({
            playlistId: data.items[0].id,
            uri: data.items[0].uri,
            hostId: userId,
            playing: false
          })
      playlistId = data.items[0].id;
      playlistUri = data.items[0].uri
    })
  }
    function createPlaylist(){
      console.log('created')
      spotifyApi.createPlaylist(userId, {
      "name": name,
      "description": "osafndsf",
      "collaborative": true,
      "public": false
    }).then(() => getPlaylists())
  }
  createPlaylist()
}
/* get the user's info from the /me api */
export function getMyInfo() {
  function createPlaylist(id){
    console.log('created')
    spotifyApi.createPlaylist(id, {
    "name": "testList2",
    "description": "osafndsf",
    "collaborative": true,
    "public": false
    })
  }

  return dispatch => {
    dispatch({ type: SPOTIFY_ME_BEGIN});
    spotifyApi.getMe().then(function(data){
      console.log('wtf gam')
      dispatch({ type: SPOTIFY_ME_SUCCESS, data: data });
      userId = data.id
    })
    
    
    .catch(e => {
      dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
    });
  };
}

export function skip(){
    let orderedlist = [];
    // dispatch({ type: SPOTIFY_SEARCH_LOADING});
    database.ref('songs/').once('value').then(function(snapshot){
      spotifyApi.getMyCurrentPlayingTrack().then(function(data){
        console.log(data)
        database.ref('songs/' + data.item.id).remove();
      })

      orderedlist = Object.values(snapshot.val());
      orderedlist.sort(function(a,b) {
         return b.votecount - a.votecount;
      })
       spotifyApi.skipToNext(devices)
   })
   
       
// if(keep){
//         database.ref('songs/' + keep).remove();

//       } else {
//         database.ref('songs/' + orderedlist[0].songId).remove();

//       }

//       var keep;


      // spotifyApi.addTracksToPlaylist(userId, playlistId, orderedlist[0].uri).then(()=> nextSong())
      
      
   

    
    // return orderedlist


}

export function remove(id){
  database.ref('songs/' + id).remove();
}

export function addToPlaylist(id, dummy, uri){
  console.log(playlistId)
  spotifyApi.addTracksToPlaylist(userId, playlistId, uri)
}

// export function getEndOfSong(){
//   spotifyApi
// }
export function getDevices() {

  // console.log('CALLED')
  spotifyApi.getMyDevices().then(function(data) {
    devices = data
    // console.log('win')
    console.log(data)
    // spotifyApi.pause(data)
  })
  .catch(e => {
    dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
  });
}


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

export function createPlaylist(){
  return dispatch => {
    dispatch({ type: SPOTIFY_ME_BEGIN});
    spotifyApi.createPlaylist(id, {
        "name": "testList2",
        "description": "osafndsf",
        "collaborative": true,
        "public": true
      })
    .catch(e => {
      dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
    });

  };
}

export function search(query){
  return dispatch => {
    dispatch({ type: SPOTIFY_SEARCH_LOADING});
    spotifyApi.search(query, 'track').then(function(data){
      console.log(data)
      dispatch({type: SPOTIFY_SEARCH_DONE, data: data});
    }).catch(e => {
      dispatch({ type: SPOTIFY_SEARCH_LOADING, error: e });
    });
  }
}

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
export function pause(){
    spotifyApi.pause({})
}


export function play(uri){
    if(playlistUri === uri){
      spotifyApi.play({})
      return false
    }
    else{
      return spotifyApi.play({"context_uri": playlistUri}).then(function(){
        console.log('changed')
        return true
      })

    }
    


  
}

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




