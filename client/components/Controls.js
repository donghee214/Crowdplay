import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Previous from './svgs/previous.js';
import Pause from './svgs/pause.js';
import SkipComp from './svgs/SkipComp.js';
import Play from './svgs/play.js';
import {
  pause,
  skip
} from '../actions/actions'
export default class Controls extends React.Component  {

  constructor(props){
    super(props)
    this.state = {play: this.props.isPlaying}
  }

  toggle(){
    this.setState({play: !this.state.play})
  }

  // componentDidMount(){
  //   //write cconondition to check database and see if there are any songs
  //   //if there is not render big add button
  //   //else 
  // }

  render() {

    return (
      <div className="controls" style={{
        'backgroundImage':`url(${this.props.background})`,
         boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.3)',
      }}>
        <Previous />
        {this.state.play ? <Pause pauseFunction={pause} toggle={this.toggle.bind(this)}/> : <Play toggle={this.toggle.bind(this)}/>}
        <SkipComp skip={skip}/>
      </div>
    );
  }
}


