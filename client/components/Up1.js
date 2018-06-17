import React from 'react';

export default class Up1 extends React.Component {

    render() {
        return (
        	<button className={this.props.userId in this.props.voters && this.props.voters[this.props.userId]===true ? "cbutton cbutton--effect-ivana green" : "cbutton cbutton--effect-ivana"}>
				<svg onClick={this.props.toggle} className={this.props.userId in this.props.voters && this.props.voters[this.props.userId]===true ? 'songBoxUpGreen': 'songBoxUp'} 
				height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
				    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
				    <path d="M0 0h24v24H0z" fill="none"/>
				</svg>
			</button>
        )
    }
}


