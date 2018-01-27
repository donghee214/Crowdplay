import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  render() {
    return (
      <div className="header">
      	<Setting />
        <div className="titleContainer">
	        <h3>
	        	Room Name:
	        </h3>
        	<h1 className="roomHead">Dan's Room</h1>
       	
        </div>
        <Share/>
      </div>
    );
  }
}


