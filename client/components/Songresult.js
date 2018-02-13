import React, { Component } from 'react';
import NotAdded from './svgs/NotAdded.js'
import Added from './svgs/added.js';


export default class Songresult extends React.Component  {
  constructor(props){
    super(props)
    this.state = {added:this.props.info.added}
    // console.log(this.props.info)
  }

  addSong(){
    this.setState({added:true})
    this.props.postSong(this.props.info.name, this.props.info.artists, this.props.info.duration_ms, this.props.info.album.images[0].url, this.props.info.id, this.props.info.uri).then((res) => {
      if(res === false){
        alert('too many songs')
        this.setState({added:false})
      }
    })
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

  shouldComponentUpdate(nextState){
    return this.state.added !== nextState.added
  }

  returnTime(){
    let seconds = this.props.info.duration_ms/1000;
    let minutes = Math.floor(seconds/60);
    seconds = Math.floor(seconds % 60);
    if(seconds < 10){
      seconds = '0'+seconds
    }
    return <h3 className="time">{minutes}:{seconds}</h3>
  }
  render() {
    return (
      <div className="songResult" onClick = {this.addSong.bind(this)}>
        <h1 className="searchTitle">
          {this.props.info.name}
        </h1>
        <div className="artistContain">
          {this.returnArtist()}
        </div>
        {this.returnTime()}
        {this.state.added ? <Added/>: <NotAdded/>}
      </div>
    );
  }
}


