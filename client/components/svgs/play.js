import React from 'react';
import { connect } from 'react-redux';
import {
  play
} from '../../actions/actions'
export default class Play extends React.Component {
	clickHandle(){
		this.props.toggle()
		play()	
	}
    render() {

        return (
		<svg fill="#FFFFFF" onClick={this.clickHandle.bind(this)} className="controlButtonLarge" height="24" viewBox="0 0 24 24" width="24">
			<path d="M8 5v14l11-7z"/>
			<path d="M0 0h24v24H0z" fill="none"/>
		</svg>
    
    )
}
}
