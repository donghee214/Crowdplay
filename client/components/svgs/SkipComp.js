import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	skip
} from '../../actions/actions'
class SkipComp extends Component {
	clickHandle(){
		skip()
		this.props.updateMainSong()
	}
    render() {
    	console.log(this.props)
        return (
			<svg onClick={this.clickHandle.bind(this)}className="controlButton" fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
			    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
			    <path d="M0 0h24v24H0z" fill="none"/>
			</svg>
        )
    }
}
export default connect(state => state)(SkipComp);