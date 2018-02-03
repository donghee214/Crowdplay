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

  render() {

    return (
      <div className="controls" style={{
          backgroundImage:`linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0), rgba(0,0,0,0.7)), url(${this.props.background})`
      }}>
        <Previous />
        {this.props.isPlaying ? <Pause pauseFunction={this.props.pause}/> : <Play playFunction={this.props.play}/>}
        <SkipComp playFunction={this.props.play}/>
      </div>
    );
  }
}


