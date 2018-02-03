import React, { Component } from 'react';
import Join from './svgs/join.js'
import InputBox from './Input.js'
// import {
//   getMyInfo,
//   setTokens,
// }   from '../actions/actions';

/**
 * Our user page
 * Displays the user's information
 */
export default class Joinroom extends React.Component  {
  /** When we mount, get the tokens from react-router and initiate loading the info */
  shouldComponentUpdate(){
    return false
  }

  render() {
    return (
      <div className="createContainer">
        <Join style="createRoom" />
        <InputBox func ={this.props.join} removeError={this.props.removeError}/>
      </div>
    );
  }
}


