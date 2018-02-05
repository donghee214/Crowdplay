import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home.js';
import Dropdown from './Dropdown.js';
import CreateRoom from './CreateRoom.js';
import JoinRoom from './joinRoom.js';
import VotingRoom from './Votingroom.js';
import Search from './Search.js';
import Devices from './Devices.js'
import {
  setTokens,
  getMyInfo,
  createDB,
  joinDB,
  changeDevice
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
        roomName: null,
        errorMsg: null,
        errorMsgStyle: 0,
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
    this.setState({whatToRenderDropdown: <CreateRoom removeError={this.removeError.bind(this)} errorMsg={this.state.errorMsg} create={this.create.bind(this)}/>})
  }

  joinClicked(){
    this.setState({whatToRenderDropdown: <JoinRoom removeError={this.removeError.bind(this)} errorMsg={this.state.errorMsg} join={this.join.bind(this)}/>})
  }

  create(roomName){
    const {dispatch} = this.props
    dispatch(createDB(roomName)).then((result) => {
      if(result){
          this.setState({errorMsg:null, votingRoom: true})
          this.toggleDropDown()
      }
      else{
        this.setState({errorMsg: <h1 className="errorMessage">Roomname is in use<span className="period">.</span></h1>})
        // console.log(this.state.errorMsgStyle, 'WTFF')
        // setTimeout(() => {
        //   this.setState({errorMsgStyle: 0})
        // }, 1000)
      }
    }) 
  }

  join(roomName){
    const {dispatch} = this.props
    dispatch(joinDB(roomName)).then((result) => {
      if(result){
          this.setState({errorMsg:null, votingRoom: true})
          this.toggleDropDown()
      }
      else{
        this.setState({errorMsg: <h1 className="errorMessage">Room does not exist</h1>})
      }
    })
  }

  removeError(){
    this.setState({errorMsg:null})
  }

  searchClicked(){
    this.setState({whatToRenderDropdown: <Search />})
    this.toggleDropDown()
  }

  devicesClicked(){
    this.setState({whatToRenderDropdown: <Devices changeDevice={this.changeDevice.bind(this)}/>})
    this.toggleDropDown()
  }

  changeDevice(device){
    const {dispatch} = this.props
    return dispatch(changeDevice(device))
  }

  render() {
    const dropPayload = {
        toggleDropDown: this.toggleDropDown.bind(this),
        createClicked: this.createClicked.bind(this),
        joinClicked: this.joinClicked.bind(this)
    }
    return (
      <div>
        {this.state.errorMsg}
        <Dropdown renderContent = {this.state.whatToRenderDropdown} toggleDropDown={this.toggleDropDown.bind(this)} doUnmount={this.state.mainPage}/>
        {this.state.votingRoom ? <VotingRoom devicesClicked={this.devicesClicked.bind(this)} searchClicked={this.searchClicked.bind(this)} /> : <Home dropPayload={dropPayload}/>}
      </div>
    );
  }
}


export default connect(state => state)(Landing);