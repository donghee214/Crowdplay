import React, { Component } from 'react';
import { connect } from 'react-redux';
import Previous from './svgs/previous.js';
import Pause from './svgs/pause.js';
import SkipComp from './svgs/SkipComp.js';
import Play from './svgs/play.js';
import { nextSong, setDefaultDevice } from '../actions/actions.js'


class Controls extends Component  {
    componentWillMount () {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script)
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
          name: 'Crowdplay Web Player',
          getOAuthToken: cb => { cb(this.props.accessToken); }
      });
      player.connect();
      player.on("ready", data => {
        this.props.setDefaultDevice()
      });
      player.on('player_state_changed', state => { 
          if(this.props.isPlaying && state.paused && state.duration === 0) {
            nextSong()
          }
      });
  }
}


  render() {
    return (
      <div className="controls">
        <Previous />
        <button className="playBut cbutton cbutton--effect-ivana controlAni" >
          {this.props.isPlaying ? <Pause pauseFunction={this.props.pause}/> : <Play device = {this.props.device} playFunction={this.props.play}/>}
        </button>
        <SkipComp playFunction={this.props.play}/>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    accessToken: state.accessToken,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setDefaultDevice(){
      return dispatch(setDefaultDevice())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);