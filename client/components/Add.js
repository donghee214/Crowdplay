import React, { Component } from 'react';
import Down from './svgs/down.js';
// import {
//   getMyInfo,
//   setTokens,
// }   from '../actions/actions';

/**
 * Our user page
 * Displays the user's information
 */
export default class Add extends React.Component  {

  shouldComponentUpdate(){
    return false
  }
  render() {
    
    return (
      <div className={this.props.style} onClick={this.props.searchClicked}>
      <div className="addContainerWeb">
        <div className="plus">
          <span className="addition">+</span>
        </div>
        <h2 className="addSub">Add</h2>
        <Down style="addDown"/>
        </div>
      </div>
    );
  }
}


