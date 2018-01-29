import {
  SPOTIFY_TOKENS, SPOTIFY_ME_BEGIN, SPOTIFY_ME_SUCCESS, SPOTIFY_ME_FAILURE, SPOTIFY_SEARCH_LOADING,SPOTIFY_SEARCH_DONE, SONGS
  ,GETSONGS_BEGIN, GETSONGS_END, ADD_SONGS,TOGGLE_LOADSONGS, ADD_SONGS_DONE, UPDATE_VOTE, PLAYBACK_PLAYING,
  REMOVE_SONGS, CHANGE_CURRENTSONG
} from '../actions/actions';
import update from 'immutability-helper';

/** The initial state; no tokens and no user info */
const initialState = {
  tracks: {loading:null},
  accessToken: null,
  refreshToken: null,
  playback: false,
  songList: {
    loading: null,
    add:null,
    done: null,
    list: [],
    currentSong: {
      name: "No Song",
      artist: null,
      time: null,
      picture: null
    },
    reloadAll: null
  },
  user: {
    loading: false,
    country: null,
    display_name: null,
    email: null,
    external_urls: {},
    followers: {},
    href: null,
    id: null,
    images: [],
    product: null,
    type: null,
    uri: null,
  }
};

/**
 * Our reducer
 */
export default function reduce(state = initialState, action) {
  switch (action.type) {
  // when we get the tokens... set the tokens!
  case SPOTIFY_TOKENS:
    const {accessToken, refreshToken} = action;
    return Object.assign({}, state, {accessToken, refreshToken});

  // set our loading property when the loading begins
  case SPOTIFY_ME_BEGIN:
    return Object.assign({}, state, {
      user: Object.assign({}, state.user, {loading: true})
    });

  // when we get the data merge it in
  case SPOTIFY_ME_SUCCESS:
    return Object.assign({}, state, {
      user: Object.assign({}, state.user, action.data, {loading: false})
    });

  // currently no failure state :(
  case SPOTIFY_ME_FAILURE:
    return state;
  case 'SET_MESSAGE':
      return {
        message: action.payload
  };
  case SPOTIFY_SEARCH_LOADING:
    console.log('START')
    return Object.assign({}, state, {
      tracks: Object.assign({}, state.tracks, {loading: true})
    });
  case SPOTIFY_SEARCH_DONE:
  console.log('DONE')
    return Object.assign({}, state, {
      tracks: Object.assign({}, action.data, {loading: false})
    });

  case SONGS:
    return Object.assign({}, {
      tracks: Object.assign({}, action.data, {loading: false})
    });
  case GETSONGS_BEGIN:
    return Object.assign({}, state, {
      songList: Object.assign({}, state.songList, {loading: true}, {reloadAll: false})
    });

  case GETSONGS_END:
    return Object.assign({}, state, {
      songList: Object.assign({}, {list:action.data}, {loading: false}, {reloadAll:true}, {user: state.user.id}, {currentSong: state.songList.currentSong})
    });

  case ADD_SONGS:
    let newArr = state.songList.list.slice(0)
    newArr.push(action.data)
    return Object.assign({}, state, {
      songList: Object.assign({}, {list: newArr}, {loading: false}, {type:'song'}, {user: state.user.id}, {currentSong: state.songList.currentSong})
    });

  case ADD_SONGS_DONE:
    return Object.assign({}, state, {
      songList: Object.assign({}, {list: state.songList.list}, {loading: false}, {add:false}, {user: state.user.id}, {currentSong: state.songList.currentSong})
    });

  case TOGGLE_LOADSONGS:
    return Object.assign({}, state, {
      songList: Object.assign({}, state.songList, {loading: false}, {reloadAll:!state.songList.reloadAll})
    });

  case PLAYBACK_PLAYING:
   return Object.assign({}, state, {
      playback: action.data
    });

  case REMOVE_SONGS:
    return Object.assign({}, state, {
      songList: Object.assign({}, {list: action.data}, {loading: false}, {type:'song'}, {user: state.user.id}, {currentSong: state.songList.currentSong})
    });

  case CHANGE_CURRENTSONG:
    return Object.assign({}, state, {
      songList: Object.assign({}, {list: state.songList.list}, {loading: false}, {type:'song'}, {user: state.user.id}, 
        {currentSong: {
          name: action.data.SongName,
          artist: action.data.artist[0].name,
          time: action.data.time,
          picture: action.data.picture
        }})
    });
  case UPDATE_VOTE:
    for(let i = 0; i < state.songList.list.length; i++){
      if(state.songList.list[i].songId === action.data.songId){
        return update(state,{
          songList: {list: {
            [i]: {
              votecount:{$set: action.data.votecount},
              voters: {$set: action.data.voters}
            }
          }}
        })
      }
    }
   
  default:
    return state
  }
}
