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

  // componentDidMount() {
  //   this.search()
  //   // params injected via react-router, dispatch injected via connect
  // }

  componentDidMount(){
    console.log(this.props)
  }

  search(){
    const {dispatch} = this.props;
    dispatch(search(this.props.query))
  }

  // componentWillReceiveProps(){

  // }

  // shouldComponentUpdate(){
  //   console.log(this.props.tracks)
  //   if(!(this.props.tracks.loading) && this.props.tracks){
  //     alert('ran')
  //     console.log(this.props.tracks)
  //     const songList = this.props.tracks.tracks.items.map((info) =>
  //         <h1>
  //           d;lamsd
  //         </h1>
  //     );
  //     this.setState({ songs: songList})
  //   }
  // }


  renderReturns(){
    let songList = "No Results";
    // console.log(this.props.tracks.tracks.items)
      // console.log(this.props.tracks)

    if (this.props.tracks.tracks){
      songList = this.props.tracks.tracks.items.map((info) =>
        <Songresult userId={this.props.user.id} postSong={postSong} addToPlaylist={addToPlaylist} info = {info} key ={info.id}/>
      );
    }
    return songList
  }



  render() {
    console.log(this.props)
    if(this.props.enterDown){
      this.search();
      this.props.enterUp()
    }
    return (
      <div className="results">
        <h2 className="searchText">
          Search Results<span className="periodSmaller">.</span>
        </h2>
        {this.props.tracks.loading ? <h1>Loading</h1> : this.renderReturns()}
      </div>
    );

  }
}


export default connect(state => state)(Results);