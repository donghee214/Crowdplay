import React, { Component } from 'react';
import OptionBox from './OptionBox.js';
import Createlogo from './svgs/create.js';
import Joinlogo from './svgs/join.js';
// import {
//   getMyInfo,
//   setTokens,
// }   from '../actions/actions';

/**
 * Our user page
 * Displays the user's information
 */
export default class Home extends React.Component {
      constructor(props){
      super(props)
      this.state = {
        create:{
          text:'create',
          image: <Createlogo style ="logo"/>,
          dropPayload: this.props.dropPayload
        },
        join:{
          text:'join',
          image: <Joinlogo style = "logo"/>,
          dropPayload: this.props.dropPayload
        }
      }
    }
  /** When we mount, get the tokens from react-router and initiate loading the info */
  componentDidMount() {
    // params injected via react-router, dispatch injected via connect
    // const {dispatch, params} = this.props;
    // const {accessToken, refreshToken} = params;
    // dispatch(setTokens({accessToken, refreshToken}));

  }

  /** Render the user's info */
  render() {
    // const { accessToken, refreshToken, user } = this.props;
    // const { loading, display_name, images, id, email, external_urls, href, country, product } = user;
    // const imageUrl = images[0] ? images[0].url : "";
    // if we're still loading, indicate such
    // if (loading) {
    //   return <h2>Loading...</h2>;
    // }


    return (
      <div className="landing">
        <h1 className="title"> 
          jukebox<span className="period">.</span>
        </h1>
        <h2 className="title subtitle">
          Crowdsource your playlist
        </h2>
        <div className="options">
          <OptionBox payload={this.state.create} id ="create" key={"create"}/>
          <OptionBox payload={this.state.join} id="join" key={"join"}/>
        </div>
      </div>
    );
  }
}


