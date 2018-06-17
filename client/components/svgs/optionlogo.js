import React from 'react';

export default class Optionlogo extends React.Component {
    render() {
        return (
        	<button onClick={this.props.optionClicked}  className = {this.props.optionClicked1 ? "cbutton optionButton cbutton--effect-ivana optionAni green" : "cbutton optionButton cbutton--effect-ivana optionAni"}>
				<svg className={this.props.optionClicked1 ? "optionGreen" : "option1"} height="40" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">
				    <path d="M0 0h24v24H0z" fill="none"/>
				    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
				</svg>
			</button>
		 )
    }
}
