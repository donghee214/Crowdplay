import React, { Component } from 'react';

export default class SkipComp extends React.Component  {

    render() {
        return (
			<svg onClick={this.props.playFunction} className="controlButton" fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
			    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
			    <path d="M0 0h24v24H0z" fill="none"/>
			</svg>
        )
    }
}
