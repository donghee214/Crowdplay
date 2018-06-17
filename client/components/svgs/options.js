import React from 'react';
import OptionLogo from './optionlogo.js';
import OptionList from  '../optionList.js';

export default class Options extends React.Component {
	constructor(props){
		super(props)
		this.state = {optionClicked1: false}
	}

	optionClicked(){
		this.setState({optionClicked1: !this.state.optionClicked1})
	}

    render() {
        return (
        	<div className={this.state.optionClicked1 ? 'optionContainer': 'optionContainerLight'}>
				<OptionLogo optionClicked1 = {this.state.optionClicked1} optionClicked={this.optionClicked.bind(this)}/>
				{this.state.optionClicked1 ? <OptionList songId={this.props.songId} adder={this.props.adder} roomType={this.props.roomType}/> : null}
			</div>
		 )
    }
}
