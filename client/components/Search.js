import React, { Component } from 'react';
import Results from './Results.js'
import InputSearch from './InputSearch.js';

import SuggestionTrigger from './SuggestionTrigger.js'
// import SuggestionContainer from './Suggestion.js';

export default class Search extends React.Component  {
  constructor(props){
    super(props)
    this.state ={
      query: null,
      // showSuggestions: false
    }
  }

  search(evt, query){
    if(evt){
      evt.target.children[0].blur()
      evt.preventDefault();
    }

    this.setState({query: query})
    return false;
  }
  shouldComponentUpdate(nextState){
    return this.state.query !== nextState.query
  }
  render() {
    return (
      <div className="search">
        <div className="topContent">
          <h3 className="searchHelp">Search for songs and artists</h3>
          <InputSearch search = {this.search.bind(this)}/>
        </div>
        {this.state.query ? <Results query={this.state.query}/> : <SuggestionTrigger />}
      </div>
    );

  }
}


