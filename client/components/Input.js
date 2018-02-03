import React, { Component } from 'react';

// import {
//   getMyInfo,
//   setTokens,
// }   from '../actions/actions';

/**
 * Our user page
 * Displays the user's information
 */
export default class Joinroom extends React.Component  {
constructor(props){
    super(props)
    this.state ={
      inputValue : ''
    }
  }
   updateInputValue(event){
    this.setState({inputValue: event.target.value});
  }
  renderSonglist(){
    this.props.func(this.state.inputValue)
    this.props.removeError()
    // createPlaylistContain(this.state.inputValue);
  }

  search(evt){
    evt.preventDefault();
    this.props.func(this.state.inputValue)
    this.props.removeError()
  }

  render() {
    return (
     <div className="contain">
     <form onSubmit={(e) => this.search(e)}>
          <input className="inputRoom" placeholder = "Create room name" type="text" value={this.state.inputValue} onChange={this.updateInputValue.bind(this)}/>
         </form>
      <h1 onClick={this.renderSonglist.bind(this)} className="dropButton">Create<span className="period">.</span></h1>
     </div>
    );
  }
}


