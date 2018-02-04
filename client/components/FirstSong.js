import React, { Component } from 'react';
import Controls from './Controls.js';

export default class Firstsong extends React.Component   {
  // constructor(props){
  //     super(props)
  //     this.state = {noSongs: true, title:'No Song Chosen', artist: null, timeBox:null, background:null}
  //   }
  shouldComponentUpdate(nextProps){
    const songChange = this.props.title !== nextProps.title;
    const pauseChange = this.props.isPlaying !== nextProps.isPlaying;
    return songChange || pauseChange
  }
  render() {
    return (
      <div>
        {this.props.roomType ? <Controls pause={this.props.pause} play={this.props.play} isPlaying={this.props.isPlaying} firstSong={this.props.firstSong} background ={this.props.background}/> : null}
        <div className="bottomContent" style= {{height:'20%'}}>
          <h1 className="songTitle">
            {this.props.title}
          </h1>
          <h2 className="artistTitle">
            {this.props.artist}
          </h2>
          <h3 className="timeBox">
            {this.props.timebox}
          </h3>
        </div>
      </div>
    );
  }
}
