import React, { Component } from 'react';
import OptionBox from './OptionBox.js';
import Createlogo from './svgs/create.js';
import Joinlogo from './svgs/join.js';
// import {
//   getMyInfo,
//   setTokens,
// }   from '../actions/actions';

/**
 * Our user page
 * Displays the user's information
 */
export default class Home extends React.Component {
      constructor(props){
      super(props)
      this.state = {
        create:{
          text:'create',
          image: <Createlogo style ="logo"/>,
          dropPayload: this.props.dropPayload
        },
        join:{
          text:'join',
          image: <Joinlogo style = "logo"/>,
          dropPayload: this.props.dropPayload
        }
      }
    }
  /** When we mount, get the tokens from react-router and initiate loading the info */
  shouldComponentUpdate(){
    return false
  }
  /** Render the user's info */
  render() {
    return (
      <div className="landing">
        <h1 className="title"> 
          jukebox<span className="period">.</span>
        </h1>
        <h2 className="title subtitle">
          Crowdsource your playlist
        </h2>
        <div className="options">
          <OptionBox payload={this.state.create} id ="create" key={"create"}/>
          <OptionBox payload={this.state.join} id="join" key={"join"}/>
        </div>
      </div>
    );
  }
}


