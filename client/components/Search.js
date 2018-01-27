import React, { Component } from 'react';
import { connect } from 'react-redux';
import Results from './Results.js'


export default class Search extends React.Component  {
  constructor(props){
    super(props)
    this.state ={
      inputValue : '',
      showResults: false,
      enterDown: false
    }
  }
  updateInputValue(event){
    this.setState({inputValue: event.target.value});
  }

  enterUp(){
    this.setState({enterDown: false})
  }

  search(evt){

    evt.preventDefault();
    // const {dispatch} = this.props;
    // dispatch(search(this.state.inputValue))
    this.setState({showResults:true, enterDown:true})
    return false;
  }



  render() {
    return (
      <div className="search">
        <div className="topContent">
          <h3 className="searchHelp">Search for songs, artists, and playlists</h3>
          <form onSubmit={(e) => this.search(e)}>
            <input className="inputRoom searchSong" placeholder = "Search" type="text" value={this.state.inputValue} onChange={this.updateInputValue.bind(this)}/>
          </form>
        </div>

        {this.state.showResults ? <Results enterUp={this.enterUp.bind(this)} enterDown={this.state.enterDown} query={this.state.inputValue}/> : null}
      </div>
    );

  }
}


