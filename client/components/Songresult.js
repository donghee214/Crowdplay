import React, { Component } from 'react';
import NotAdded from './svgs/NotAdded.js'
import Added from './svgs/added.js';


export default class Songresult extends React.Component  {
  constructor(props){
    super(props)
    this.state = {added:false}
  }

  addSong(){
    this.setState({added:true})
    this.props.addToPlaylist(this.props.info.id, "dummy", this.props.info.uri)
    this.props.postSong(this.props.info.name, this.props.info.artists, this.props.info.duration_ms, this.props.info.album.images[0].url, this.props.info.id, this.props.info.uri, this.props.userId)

  }

  removeSong(){
    this.setState({added:false})
  }

  returnArtist(){
    const artistList = this.props.info.artists.map((info) =>
        <span key ={info.name} className="artistList">
          {info.name} 
        </span>
    );
    return artistList
  }

  returnTime(){
    let seconds = this.props.info.duration_ms/1000;
    let minutes = Math.floor(seconds/60);
    seconds = Math.floor(seconds % 60);
    return <h3 className="time">{minutes}:{seconds}</h3>
  }
  render() {
    return (
      <div className="songResult">
        <h1 className="searchTitle">
          {this.props.info.name}
        </h1>
        <div className="artistContain">
          {this.returnArtist()}
        </div>
        {this.returnTime()}
        {this.state.added ? <Added removeSong={this.removeSong.bind(this)}/>: <NotAdded addSong={this.addSong.bind(this)}/>}
      </div>
    );
  }
}


