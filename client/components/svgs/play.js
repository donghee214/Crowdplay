import React from 'react';

export default class Play extends React.Component {
	clickHandle(){
		if(this.props.device){
			this.props.playFunction('play')
		}
		else{
			alert('No Device Chosen')
		}
	}
    render() {

        return (
				<svg fill="#FFFFFF" className="controlButtonLarge" onClick={this.clickHandle.bind(this)} height="24" viewBox="0 0 24 24" width="24">
					<path d="M8 5v14l11-7z"/>
					<path d="M0 0h24v24H0z" fill="none"/>
				</svg>
    )
}
}
