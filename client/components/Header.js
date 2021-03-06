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
	        	Join at:
	        </h3>
        	<h1 className="roomHead">crowdplay.ca/<span className="nameId">{this.props.roomName}</span></h1>
       	
        </div>
        <Share roomName={this.props.roomName}/>
      </div>
    );
  }
}


