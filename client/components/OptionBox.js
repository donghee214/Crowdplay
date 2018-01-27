import React, { Component } from 'react';
import { connect } from 'react-redux';

// import {
//   getMyInfo,
//   setTokens,
// }   from '../actions/actions';

/**
 * Our user page
 * Displays the user's information
 */
export default class Option extends React.Component  {
  /** When we mount, get the tokens from react-router and initiate loading the info */
  // componentDidMount() {
  //   console.log(this.props)
  //   // params injected via react-router, dispatch injected via connect
  //   // const {dispatch, params} = this.props;
  //   // const {accessToken, refreshToken} = params;
  //   // dispatch(setTokens({accessToken, refreshToken}));

  // }

  buttonClicked(){
    
    this.props.payload.dropPayload.toggleDropDown();
    if(this.props.id === "create"){
      this.props.payload.dropPayload.createClicked();
    }
    else if(this.props.id === "join"){
      this.props.payload.dropPayload.joinClicked();
    }
  }

  /** Render the user's info */
  render() {
    return (
      <div className="option" onClick={this.buttonClicked.bind(this)}>
        {this.props.payload.image}
        <h1 className="fontSize">{this.props.payload.text}<span className="period">.</span></h1>
      </div>
    );
  }
}


