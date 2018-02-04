import React from 'react';


export default class Setting extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			color: 'setting'
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.device){
			this.setState({color: 'settingGreen'})
		}
		else{
			this.setState({color: 'setting'})
		}
	}

	shouldComponentUpdate(nextProps){
		return this.props.device !== nextProps.device
	}

    render() {
        return (
        	<div className="settingContain" onClick={this.props.devicesClicked}>
				<svg className={this.state.color} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
				    <path d="M0 0h24v24H0z" fill="none"/>
				    <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 1.99 2 1.99L17 22c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 2c1.1 0 2 .9 2 2s-.9 2-2 2c-1.11 0-2-.9-2-2s.89-2 2-2zm0 16c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
				</svg>
					{this.props.device ? <h3 className="devices">{this.props.device.name}</h3> : <h3 className="noDevice">No Device</h3>}
			</div>
		 )
    }
}
