import React, { Component } from 'react';
import Create from './svgs/create.js';
import InputBox from './Input.js';

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
  

 
  shouldComponentUpdate(nextState){
    return false
  }



  /** Render the user's info */
  render() {
    return (
      <div className="createContainer">
        <Create style="createRoom"/>
        <InputBox func ={this.props.create} removeError={this.props.removeError}/>
        
      </div>
    );
  }
}


