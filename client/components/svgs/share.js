import React from 'react';


export default class Share extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			renderText: false,
			displayMsg: false
		}
	}
	copyText(){
		this.setState({renderText: true}, () => {
			this.textInput.select()
			document.execCommand("Copy");
			this.setState({renderText: false, displayMsg: true})
		})
		setTimeout(() => {
			this.setState({displayMsg: false})
		}, 1300)
	}

	shouldComponentUpdate(nextState){
		const renderText = this.state.renderText !== nextState.renderText;
		const displayMsg = this.state.displayMsg !== nextState.displayMsg;
		return renderText || displayMsg
	}
    render() {
        return (
        	<div className="shareContain">
				<svg className ="share" fill="#1ED760" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
				    <path d="M0 0h24v24H0z" fill="none"/>
				    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
				</svg>
				<h3 className="devices">
					Share
				</h3>
				{this.state.renderText ? <input className="shareInput" ref={(input) => {this.textInput = input;}} value={"crowdplay.ca/" + this.props.roomName} /> : null }
				{this.state.displayMsg ? <h2 className="message">Link copied to clipboard!</h2> : null}
				<button className="shareButton" onClick={this.copyText.bind(this)}>
				</button>
			</div>
		 )
    }
}
