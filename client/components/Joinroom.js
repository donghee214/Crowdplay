import React, { Component } from 'react';
import { connect } from 'react-redux';
import Join from './svgs/join.js'
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
  componentDidMount() {
    // params injected via react-router, dispatch injected via connect
    // const {dispatch, params} = this.props;
    // const {accessToken, refreshToken} = params;
    // dispatch(setTokens({accessToken, refreshToken}));

  }

  renderSonglist(){
    this.props.showVoting(this.props.id)
  }

  /** Render the user's info */
  render() {



    return (
      <div className="createContainer">
        <Join style="createRoom" />
        <input className="inputRoom" placeholder = "Join room name" type="text"/>
        <h1 onClick={this.renderSonglist.bind(this)} className="dropButton">Join<span className="period">.</span></h1>
      </div>
    );
  }
}


