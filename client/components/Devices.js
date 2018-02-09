import React, { Component } from 'react';
import DeviceOption from './DeviceOption';
import Refresh from './svgs/refresh.js';
import {
  getDevices,
} from '../actions/actions'



export default class Devices extends React.Component  {
	constructor(props){
		super(props)
		this.state = {
			devices: [],
			loading:true
		}
	}
	componentDidMount(){
		getDevices().then((devices) =>{
			this.setState({loading: false, devices: devices})
		})
	}

	refreshView(){
		this.setState({loading: true})
		getDevices().then((devices) => {
			this.setState({loading: false, devices: devices})
		})
	}

	shouldComponentUpdate(nextState){
		return this.state.devices !== nextState.devices
	}

	changeDevice(device){
		this.props.changeDevice(device).then(() => {
			setTimeout(() => {
				this.refreshView()
			},500)
			
		})
	}



  render() {
    return (
      <div className="devicesView">
      <button className="cbutton cbutton--effect-ivana1" style={{marginTop: '15vh'}}>
       	<Refresh refreshView={this.refreshView.bind(this)}/>
      </button>
      <h2 className="instru">
      	Open Spotify on a device for it to be visible here
      </h2>
      {this.state.loading ? <h1> loading </h1>:
      	<div className="devicesList">
      	 <h2 className="searchText">
          Available Devices<span className="periodSmaller">.</span>
        </h2>
        {this.state.devices.map((info) => 
        	<DeviceOption changeDevice={this.changeDevice.bind(this)} info={info} key ={info.id}/>
        )}
        </div> 
    }
      
      </div>
    );

  }
}


