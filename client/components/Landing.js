import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home.js';
import Dropdown from './Dropdown.js';
import CreateRoom from './CreateRoom.js';
import JoinRoom from './joinRoom.js';
import VotingRoom from './Votingroom.js';
import Search from './Search.js';
import {
  setTokens,
  getMyInfo,
  getDevices
}   from '../actions/actions';

/**
 * Our user page
 * Displays the user's information
 */
class Landing extends Component {
  constructor(props){
      super(props)
      this.state = {
        votingRoom: false,
        mainPage: true,
        whatToRenderDropdown: null,
        roomType: null,
        roomName: null,
      }
    }

  /** When we mount, get the tokens from react-router and initiate loading the info */
  componentDidMount() {
    const {dispatch, params} = this.props;
    const {accessToken, refreshToken} = params;
    dispatch(setTokens({accessToken, refreshToken}));
    dispatch(getMyInfo())
    // dispatch(getDevices())

  }
  toggleDropDown(){
    this.setState({mainPage: !this.state.mainPage})
  }

  createClicked(){
    this.setState({whatToRenderDropdown: <CreateRoom id={true} showVoting={this.showVoting.bind(this)}/>})
  }

  joinClicked(){
    this.setState({whatToRenderDropdown: <JoinRoom id={false} showVoting={this.showVoting.bind(this)}/>})
  }

  showVoting(room, roomName){
    this.setState({votingRoom: true, roomType: room, roomName: roomName})
    this.toggleDropDown()
  }

  searchClicked(){
    this.setState({whatToRenderDropdown: <Search />})
    this.toggleDropDown()
  }

  // eraseHome(){
  //   alert("fdslkfn")
  //   this.setState({votingRoom:true})
  // }

  /** Render the user's info */
  render() {
    const dropPayload = {
        toggleDropDown: this.toggleDropDown.bind(this),
        createClicked: this.createClicked.bind(this),
        joinClicked: this.joinClicked.bind(this)
    }
    return (
      <div>
        <Dropdown renderContent = {this.state.whatToRenderDropdown} toggleDropDown={this.toggleDropDown.bind(this)} doUnmount={this.state.mainPage}/>
        {this.state.votingRoom ? <VotingRoom searchClicked={this.searchClicked.bind(this)}roomName ={this.state.roomName} roomType={this.state.roomType}/> : <Home dropPayload={dropPayload}/>}
      </div>
    );
  }
}


export default connect(state => state)(Landing);