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
                '0':[100,0],
        '1':[0,100],
        '2':[100,100],
        '3':[0,200],
        '4':[100,200],
        '5':[0,300],
        '6':[100,300],
        '7':[0,400],
        '8':[100,400],
        '9':[0,500],
        '10':[100,500],
        '11':[0,600],
        '12':[100,600],
        '13':[0,700],
        '14':[100,700],
        }
      }
    }
    componentDidMount(){
       this.props.onOrderSongs();
    }

  
  render() {    
    // console.log('SONG SECTION RERENDER')
    return (
        <div className="upNext">
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