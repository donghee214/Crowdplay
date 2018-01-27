import React from 'react';

export default class Up1 extends React.Component {
	 constructor(props){
	    super(props)
	    this.state = {clicked: false}
	  }
	clickHandle(){
		// if(this.state.click){
		// 	this.props.toggle()
		// 	this.setState({clicked: true})
		// }
		// else{
		// 	this.props.unToggle()
		// 	this.setState({clicked: false})
		// }
		this.props.toggle()
	}

    render() {
    	console.log(this.props)
        return (
			<svg onClick={this.clickHandle.bind(this)} className={this.props.userId in this.props.voters && this.props.voters[this.props.userId]===true ? 'songBoxUpGreen': 'songBoxUp'} 
			height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
			    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
			    <path d="M0 0h24v24H0z" fill="none"/>
			</svg>
        )
    }
}

