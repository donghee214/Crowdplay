import React, { Component } from 'react';
import Playing from './svgs/playing.js'
// import {
//   getMyInfo,
//   setTokens,
// }   from '../actions/actions';

/**
 * Our user page
 * Displays the user's information
 */
export default class DeviceOption extends React.Component  {


  render() {
    return (

     <div className="deviceOptionBox" onClick={() => {this.props.changeDevice(this.props.info)}}>
       <h2 className="deviceName">
          {this.props.info.name}
       </h2>
      <h2 className="deviceType">
        {this.props.info.type}
      </h2>
      {this.props.info.is_active ? <Playing /> : null}
     </div>
    
    );
  }
}


