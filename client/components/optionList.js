import React from 'react';
import { connect } from 'react-redux';
import Delete from './svgs/delete.js';

class OptionList extends React.Component {
	shouldComponentUpdate(){
		return false
	}
    render() {
        return (
        	<div className="optionItemContainer">
				{this.props.roomType || this.props.adder === this.props.userId? <Delete adder={this.props.adder} songId={this.props.songId}/>: null}
			</div>
		 )
    }
}

function mapStateToProps(state) {
  return {
    userId: state.user.id,
  };
}

// function mapDispatchToProps(dispatch) {
//   return {}
// }

export default connect(mapStateToProps)(OptionList);