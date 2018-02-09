import React, { Component } from 'react';
import Setting from './svgs/setting.js';
import Share from './svgs/share.js';


// import {
//   getMyInfo,
//   setTokens,
// }   from '../actions/actions';

/**
 * Our user page
 * Displays the user's information
 */
export default class Header extends React.Component  {
  shouldComponentUpdate(nextProps){
    return this.props.device !== nextProps.device
  }
  render() {
    return (
      <div className="header">
      	{this.props.roomType ? <Setting devicesClicked={this.props.devicesClicked} device={this.props.device}/>:null}
        <div className="titleContainer">
	        <h3>
	        	Room Name:
	        </h3>
        	<h1 className="roomHead">{this.props.roomName}</h1>
       	
        </div>
        <Share/>
      </div>
    );
  }
}


