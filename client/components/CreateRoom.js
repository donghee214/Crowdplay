import React, { Component } from 'react';
import Create from './svgs/create.js'

// import {
//   getMyInfo,
//   setTokens,
// }   from '../actions/actions';

/**
 * Our user page
 * Displays the user's information
 */
export default class Createroom extends React.Component  {
  /** When we mount, get the tokens from react-router and initiate loading the info */
  constructor(props){
    super(props)
    this.state ={
      inputValue : ''
    }
  }

  updateInputValue(event){
    this.setState({inputValue: event.target.value});
  }


  renderSonglist(){
    this.props.showVoting(this.props.id, this.state.inputValue)
    // createPlaylistContain(this.state.inputValue);
  }

  /** Render the user's info */
  render() {

    return (
      <div className="createContainer">
        <Create style="createRoom"/>
        <input className="inputRoom" placeholder = "Create room name" type="text" value={this.state.inputValue} onChange={this.updateInputValue.bind(this)}/>
        <h1 onClick={this.renderSonglist.bind(this)} className="dropButton">Create<span className="period">.</span></h1>
      </div>
    );
  }
}


