import React, { Component } from 'react';
import Songresult from './Songresult.js'
import {
  search,
  postSong,
  deleteSong,
}   from '../actions/actions';

export default class Results extends React.Component  {
  constructor(props){
      super(props)
      this.state = {songs: null}
    }


  shouldComponentUpdate(nextProps, nextState){
    // console.log(this.state, nextState)
    return this.state.songs !== nextState.songs
    
  }

  componentDidMount(){
    this.renderReturns(this.props.query)
  }

  componentWillReceiveProps(nextProps){
    // console.log(this.props.querynextProps)
     if(this.props.query !== nextProps.query){
      this.renderReturns(nextProps.query)
    }
  }
  
  renderReturns(query){
    search(query).then((data) => {
      let songList = "No Results";
        songList = data.map((info) =>
          <Songresult deleteSong={deleteSong} postSong={postSong} info = {info} key ={info.id}/>
        );
      this.setState({songs: songList})
    })
  }



  render() {
    return (
      <div className="results">
        <h2 className="searchText">
          Search Results<span className="periodSmaller">.</span>
        </h2>
        {this.state.songs}
      </div>
    );

  }
}
