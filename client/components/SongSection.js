import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header.js';
import Add from './Add.js';
import Song from './Song.js';
import {
  orderSongs,
  watchGuestAddedEvent,
  watchChildRemoved,
  voteListener,
} from '../actions/actions'

class SongSection extends Component  {
  constructor(props){
      super(props)
      this.state = {
        isPlaying: false,
        grid: {
        '0':[50,0],
        '1':[0,50],
        '2':[50,50],
        '3':[0,100],
        '4':[50,100],
        '5':[0,150],
        '6':[50,150],
        '7':[0,200],
        '8':[50,200],
        }
      }
    }
    componentDidMount(){
       this.props.onOrderSongs();
    }

  
  render() {    
    // console.log('SONG SECTION RERENDER')
    return (
        <div className="upNext" style={{height:'50vw'}}>
            <Add searchClicked={this.props.searchClicked} style="addContainerSong"/>}
            {this.props.songSection.list.map((info, index) =>
                <Song userId={this.props.songSection.user} key={this.props.songSection.list[index].songId} votes={this.props.songSection.list[index].votecount}info = {info} position={this.state.grid[index]}/>
            )}
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    songSection: state.songList,
  };
}

function mapDispatchToProps(dispatch) {
  watchGuestAddedEvent(dispatch);
  voteListener(dispatch);
  watchChildRemoved(dispatch);
    return {
    onOrderSongs() {
      return dispatch(orderSongs())
    },
  }

}



export default connect(mapStateToProps, mapDispatchToProps)(SongSection);