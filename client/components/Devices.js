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
			devices: []
		}
	}
	componentDidMount(){
		getDevices().then((devices) =>{
			this.setState({devices: devices})
		})
	}

	refreshView(){
		getDevices().then((devices) => {
			console.log(devices)
			this.setState({devices: devices})
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
       <Refresh refreshView={this.refreshView.bind(this)}/>
      <h2 className="instru">
      	Open Spotify on a device for it to be visible here
      </h2>
      <div className="devicesList">
      	 <h2 className="searchText">
          Available Devices<span className="periodSmaller">.</span>
        </h2>
        {this.state.devices.map((info) => 
        	<DeviceOption changeDevice={this.changeDevice.bind(this)} info={info} key ={info.id}/>
        )}
        </div>
      
      </div>
    );

  }
}


