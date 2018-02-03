import React, { Component } from 'react';
import { connect } from 'react-redux';
import Songresult from './Songresult.js'
import {
  search,
  postSong,
  addToPlaylist
}   from '../actions/actions';

class Results extends Component  {
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
        songList = data.tracks.items.map((info) =>
          <Songresult userId={this.props.user.id} postSong={postSong} addToPlaylist={addToPlaylist} info = {info} key ={info.id}/>
        );
      this.setState({songs: songList})
    })
  }



  render() {
    console.log(this.state)
    return (
      <div className="results">
        <h2 className="searchText">
          Search Results<span className="periodSmaller">.</span>
        </h2>
        {this.props.tracks.loading ? <h1>Loading</h1> : this.state.songs}
      </div>
    );

  }
}


export default connect(state => state)(Results);