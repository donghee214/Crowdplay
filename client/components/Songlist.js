import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  orderSongs,
  watchGuestAddedEvent,
  watchChildRemoved,
  voteListener,
  play,
  pause,
  nextSong
} from '../actions/actions'

class Songlist extends Component  {
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
    return (
      <div>
          {this.props.Votingroom.list.map((info, index) =>
                <Song userId={this.props.Votingroom.user} key={this.props.Votingroom.list[index].songId} votes={this.props.Votingroom.list[index].votecount} info = {info} position={this.state.grid[index]}/>
          )}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    Songlist: state.songList,
  };
}

function mapDispatchToProps(dispatch) {
  watchGuestAddedEvent(dispatch);
  voteListener(dispatch);
  watchChildRemoved(dispatch);
    return {
    onOrderSongs() {
      return dispatch(orderSongs())
    }
  }

  }



export default connect(mapStateToProps, mapDispatchToProps)(Songlist);