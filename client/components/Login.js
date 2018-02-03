import React, { Component } from 'react';
import Room from './svgs/room.js';
import People from './svgs/people.js';
import Playlist from './svgs/playlist.js';
import SpotifySvg from './svgs/spotifylogo.js';


/**
 * Our login page
 * Has a login button that hit's the login url
 */
export default class Login extends Component {
  render() {
    return (
      <div className="login">
      <div className="logoContainer">
        <Room />
        <h2 className="description">
        make a room<span className="period1">.</span>
        </h2>
      </div>
      <div className="logoContainer">
        <People />
        <h2 className="description">
        invite friends to join<span className="period1">.</span>
        </h2>
      </div>
      <div className="logoContainer">
        <Playlist />
        <h2 className="description">
        add and vote on songs<span className="period1">.</span>
        </h2>
   	  </div>
        <a href="/login" className="loginButton">
        	<SpotifySvg />
        	<h1 className="start">
        		Start
        	</h1>
        </a>
  
      </div>
    );
  }
}
