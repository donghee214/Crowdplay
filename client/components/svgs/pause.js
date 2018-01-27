import React from 'react';
export default class Pause extends React.Component {
	clickHandle(){
		this.props.pauseFunction()
		this.props.toggle()
	}
    render() {
        return (
			<svg onClick={this.clickHandle.bind(this)}className="controlButtonLarge" fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
				<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
				<path d="M0 0h24v24H0z" fill="none"/>
			</svg>
        )
    }
}
