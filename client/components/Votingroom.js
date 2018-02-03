import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header.js';
import Add from './Add.js';
import FirstSong from './FirstSong.js';
import Song from './Song.js';
import {
  orderSongs,
  watchGuestAddedEvent,
  watchChildRemoved,
  voteListener,
  play,
  pause,
  nextSong
} from '../actions/actions'

class Votingroom extends Component  {
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

    pauseSong(){
      this.props.pause()
    }

    play(){
      this.props.play()
    }

    nextSong(context){
      nextSong()
    }

    shouldComponentUpdate(nextProps){
      console.log(this.props)
      console.log(nextProps)
      return this.props.Votingroom.list !== nextProps.Votingroom.list
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
          <Header roomName={this.props.room.roomName}/> 
          <FirstSong isPlaying ={this.props.isPlaying} play={this.nextSong.bind(this)} pause={this.pauseSong.bind(this)} pausefirstSong={this.props.Votingroom.list[0]}  background={this.props.Votingroom.currentSong.picture} timebox={this.props.Votingroom.currentSong.time} artist ={this.props.Votingroom.currentSong.artist} title={this.props.Votingroom.currentSong.name} roomType={this.props.room.roomType}/>
        </div>
        <div style={{display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width:'100%',
                    height: '50vw',
          }}>
       
        </div>
        <div className="upNext" style={{height:'50vw'}}>
            <Add searchClicked={this.props.searchClicked} style="addContainerSong"/>}
            {this.props.Votingroom.list.map((info, index) =>
                <Song userId={this.props.Votingroom.user} key={this.props.Votingroom.list[index].songId} votes={this.props.Votingroom.list[index].votecount}info = {info} position={this.state.grid[index]}/>
            )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    Votingroom: state.songList,
    room: state.room,
    isPlaying: state.isPlaying
  };
}

function mapDispatchToProps(dispatch) {
  watchGuestAddedEvent(dispatch);
  voteListener(dispatch);
  watchChildRemoved(dispatch);
    return {
      pause(){
        return dispatch(pause())
      },
      // play(){
      //   return dispatch(play())
      // },
      nextSong(context){
        return dispatch(nextSong(context))
      },
    onOrderSongs() {
      return dispatch(orderSongs())
    },
    getMyInfo(){
      return dispatch(getMyInfo())
    }
  }

}



export default connect(mapStateToProps, mapDispatchToProps)(Votingroom);