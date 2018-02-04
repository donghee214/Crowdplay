import React, { Component } from 'react';
import { connect } from 'react-redux';
import Results from './Results.js'
import InputSearch from './InputSearch.js';


export default class Search extends React.Component  {
  constructor(props){
    super(props)
    this.state ={
      showResults: false,
      query: null
    }
  }

  search(evt, query){
    // alert('called')
    if(evt){
      evt.target.children[0].blur()
      evt.preventDefault();
    }

    this.setState({showResults:true, query: query})
    return false;
  }




  render() {
    return (
      <div className="search">
        <div className="topContent">
          <h3 className="searchHelp">Search for songs, artists, and playlists</h3>
          <InputSearch search = {this.search.bind(this)}/>
        </div>
        {this.state.showResults ? <Results query={this.state.query}/> : null}
      </div>
    );

  }
}


