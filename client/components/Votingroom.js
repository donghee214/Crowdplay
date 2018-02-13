import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header.js';
import Add from './Add.js';
import FirstSong from './FirstSong.js';
import Song from './Song.js';
import SongSection from './SongSection.js';
import {
  pause,
  nextSong,
  resume,
} from '../actions/actions'

class Votingroom extends Component{
    pauseSong(){
      this.props.pause()
    }

    nextSong(context){
      if(context === 'skip'){
        nextSong()
      }
      else{
        this.props.resume()
      }
    }

  render() {
    if(this.props.Votingroom.loading){
      return <h1>
        Loading
      </h1>
    }
    
    return (
      <div>
        <div className="currentlyPlaying">
          <Header roomType={this.props.room.roomType} devicesClicked={this.props.devicesClicked} device = {this.props.device} roomName={this.props.room.roomName}/> 
          <FirstSong isPlaying ={this.props.isPlaying} device = {this.props.device} play={this.nextSong.bind(this)} pause={this.pauseSong.bind(this)} background={this.props.Votingroom.picture} timebox={this.props.Votingroom.time} artist ={this.props.Votingroom.artist} title={this.props.Votingroom.name} roomType={this.props.room.roomType}/>
        </div>
        <div style={{display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width:'100%',
                    height: '50vw',
          }}>
       <SongSection searchClicked={this.props.searchClicked}/>
        </div>
      
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    Votingroom: state.currentSong,
    room: state.room,
    isPlaying: state.isPlaying,
    device: state.device,
  };
}

function mapDispatchToProps(dispatch) {
    return {
      resume(){
        return dispatch(resume())
      },
      pause(){
        return dispatch(pause())
      },
      getMyInfo(){
        return dispatch(getMyInfo())
      }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Votingroom);