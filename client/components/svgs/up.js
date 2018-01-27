import React from 'react';

export default class Up extends React.Component {
	 constructor(props){
	    super(props)
	    this.state = {color: '#FFF'}
	  }
	clickHandle(){

		this.props.toggleDropDown()
	}

	toggle(){

		if (this.state.color == '#FFF'){
			this.setState({color: '#1ED760'})
		}
		else{
			this.setState({color: '#FFF'})
		}
	}
    render() {
        return (
			<svg onClick={this.clickHandle.bind(this)} className={this.props.style} fill={this.state.color} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
			    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
			    <path d="M0 0h24v24H0z" fill="none"/>
			</svg>
        )
    }
}


