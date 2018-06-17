import React from 'react';
import Suggestions from './Suggestion.js';

export default class SuggestionTrigger extends React.Component {
	constructor(props){
		super(props)
		this.state={
			renderSuggestions: false
		}
	}
	clickHandle(){
		this.setState({renderSuggestions: true})
	}

    render() {
        return( <div className="browse">{this.state.renderSuggestions ? <Suggestions />: <div className="trigger" onClick={this.clickHandle.bind(this)}>
        	<svg className ="browseIcon" fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
			    <path d="M0 0h24v24H0z" fill="none"/>
			    <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-3v5.5c0 1.38-1.12 2.5-2.5 2.5S10 13.88 10 12.5s1.12-2.5 2.5-2.5c.57 0 1.08.19 1.5.51V5h4v2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/>
			</svg>
        	<h1 className="browseSongs">Browse Songs</h1></div>}</div> )
    }
}
