import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Previous from './svgs/previous.js';
import Pause from './svgs/pause.js';
import SkipComp from './svgs/SkipComp.js';
import Play from './svgs/play.js';
export default class Controls extends React.Component  {

  // constructor(props){
  //   super(props)
  //   this.state = {play: this.props.isPlaying}
  // }


  // componentDidMount(){
  //   //write cconondition to check database and see if there are any songs
  //   //if there is not render big add button
  //   //else 
  // }

  shouldComponentUpdate(nextProps){
    const playingChanged = this.props.isPlaying !== nextProps.isPlaying;
    const deviceChanged = this.props.device !== nextProps.device;
    const songChanged = this.props.background !== nextProps.background;
    return playingChanged || deviceChanged || songChanged
  }

  render() {
    return (
      <div className="controls">
        <Previous />
        <button className="cbutton cbutton--effect-ivana" >
          {this.props.isPlaying ? <Pause pauseFunction={this.props.pause}/> : <Play device = {this.props.device} playFunction={this.props.play}/>}
        </button>
        <SkipComp playFunction={this.props.play}/>
      </div>
    );
  }
}


