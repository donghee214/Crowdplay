import {
  SPOTIFY_TOKENS, SPOTIFY_ME_BEGIN, SPOTIFY_ME_SUCCESS, SPOTIFY_ME_FAILURE,
  GETSONGS_BEGIN, GETSONGS_END, ADD_SONGS, UPDATE_VOTE,
  REMOVE_SONGS, CHANGE_CURRENTSONG, SET_ROOMNAME, JOIN_ROOMNAME, TOGGLE_SONG, DEVICES
} from '../actions/actions';
import update from 'immutability-helper';

/** The initial state; no tokens and no user info */
const initialState = {
  accessToken: null,
  refreshToken: null,
  room: {
    roomName: 'aw fuck',
    roomType: false,
  },
  isPlaying:false,
  currentSong: {
      name: "No Song",
      artist: null,
      time: null,
      picture: null
  },
  songList: {
    loading: null,
    add:null,
    done: null,
    list: [],
    reloadAll: null
  },
  device: null,
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


export default function reduce(state = initialState, action) {
  switch (action.type) {
  // Set the access tokens
  case SPOTIFY_TOKENS:
    const {accessToken, refreshToken} = action;
    return Object.assign({}, state, {accessToken, refreshToken});

  // Set loading screen while getting user
  case SPOTIFY_ME_BEGIN:
    return Object.assign({}, state, {
      user: Object.assign({}, state.user, {loading: true})
    });

  // Show the user the stuff after it finishes loading
  case SPOTIFY_ME_SUCCESS:
    return Object.assign({}, state, {
      user: Object.assign({}, state.user, action.data, {loading: false})
    });

  // Show the user something went wrong
  case SPOTIFY_ME_FAILURE:
    return state;
  case GETSONGS_BEGIN:
    return Object.assign({}, state, {
      songList: Object.assign({}, state.songList, {loading: true}, {reloadAll: false})
    });


  // Return the songs that are currently in the db
  case GETSONGS_END:
    return Object.assign({}, state, {
      songList: Object.assign({}, {list:action.data}, {loading: false}, {reloadAll:true}, {user: state.user.id})
    });

  // Yeah, just update the list with the added songs
  case ADD_SONGS:
    return Object.assign({}, state, {
      songList: Object.assign({}, {list: action.data}, {loading: false}, {type:'song'}, {user: state.user.id})
    });

  // Remove a song, and return the updated list
  case REMOVE_SONGS:
    return Object.assign({}, state, {
      songList: Object.assign({}, {list: action.data}, {loading: false}, {type:'song'}, {user: state.user.id})
    });

  // Update the main song
  case CHANGE_CURRENTSONG:
    return Object.assign({}, state, {
      currentSong: Object.assign({}, {name: action.data.SongName},
          {artist: action.data.artist[0].name},
          {time: action.data.time},
          {picture: action.data.picture}
        )
    });
  // Update the vote prop
  case UPDATE_VOTE:
      return update(state,{
          songList: {list: {
            [action.index]: {
              votecount:{$set: action.data.votecount},
              voters: {$set: action.data.voters}
            }
          }}
        })
  

  case SET_ROOMNAME:
    return Object.assign({}, state, {
      room: Object.assign({},  {roomName: action.data}, {roomType: true}),
    });
  case JOIN_ROOMNAME:
    return Object.assign({}, state, {
      room: Object.assign({},  {roomName: action.data}, {roomType: false}),
    });
  case TOGGLE_SONG:
    return Object.assign({}, state, {
      isPlaying: action.data,
    });
  case DEVICES:
    return Object.assign({}, state, {
      device: action.data
    });
  default:
    return state
  }
}
