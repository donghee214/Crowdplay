import React, { Component } from 'react';
// import { connect } from 'react-redux';
import {Motion, spring} from 'react-motion';
import Up from './Up1.js';
// import Down from './svgs/down.js';

import {
  increment
} from '../actions/actions'

export default class Song extends React.Component{

  toggle(){
    increment(this.props.info.songId, this.props.userId);
  }
  returnTime(){
    let seconds = this.props.info.time/1000;
    let minutes = Math.floor(seconds/60);
    seconds = Math.floor(seconds % 60);
    return <h3 className="timeBox">{minutes}:{seconds}</h3>
  }


  shouldComponentUpdate(nextProps){
    const voteChanged = this.props.votes !== nextProps.votes
    const positionChanged = this.props.position !== nextProps.position
    return voteChanged || positionChanged
  }

  render() {
    return (
        <Motion style={{ x: spring(true ? -8 : 11) }}>
            {value => {
                return <div className="songBox" style={{
                  backgroundImage:`url(${this.props.info.picture})`,
                  boxShadow: "inset 0 0 0 1000px rgba(0,0,0,0.5)",
                  top: 0,
                  backgroundPosition:'center',
                  backgroundSize:'contain',
                  left:0,
                  WebkitTransform: `translate3d(${this.props.position[0]}vw, ${this.props.position[1]}vw, 0)`,
                  transform: `translate3d(${this.props.position[0]}vw, ${this.props.position[1]}vw, 0)`,
                }}>
                <div className="votes">
                  
                    <Up toggle ={this.toggle.bind(this)} userId={this.props.userId} voters={this.props.info.voters}/>
            
                    <h2 className="value">
                      {this.props.votes}
                    </h2>
           
                </div>
                <div className="bottomContent">
                    <h1 className="songTitle">
                      {this.props.info.SongName}
                    </h1>
                    <h2 className="artistTitle">
                      {this.props.info.artist[0].name}
                    </h2>
                    <h3 className="timeBox">
                      {this.returnTime()}
                    </h3>
                  </div>
                </div>
            } }
        </Motion>
    );
  }
}


// export default connect(state => state)(Song);

