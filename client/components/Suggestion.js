import React, { Component } from 'react';
import { connect } from 'react-redux';
import Songinsearch from './Songinsearch.js'
import { 
  getSuggestions,
  returnTopChart,
  postSong,
  getSongsDb
 } from '../actions/actions.js';


export default class Suggestion extends React.Component  {
  constructor(props){
    super(props)
    this.state ={
      songs: null,
      topSongs: null,
      dance: null,
      tgif: null,
      kpop: null
      // fetchDone: false
    }
  }

  componentDidMount(){
    let songs;
    getSongsDb().then((response) => {
      songs = response
      getSuggestions(songs).then((data) => {
      const songs = data.map((info) =>
        <Songinsearch info ={info} key={info.id}/>
      )
      this.setState({songs: songs})
    })
      returnTopChart(songs, "spotifycharts", '37i9dQZEVXbKj23U1GF4IR').then((data) => {
        const topSongs = data.map((info) =>
          <Songinsearch postSong={postSong} info ={info} key={info.id}/>
        )
        this.setState({topSongs: topSongs})
      })
      returnTopChart(songs, "spotify", '37i9dQZF1DX8ky12eWIvcW').then((data) => {
        const dance = data.map((info) =>
          <Songinsearch postSong={postSong} info ={info} key={info.id}/>
        )
        this.setState({dance: dance})
      })
      returnTopChart(songs, "spotify", '37i9dQZF1DXaXB8fQg7xif').then((data) => {
        const tgif = data.map((info) =>
          <Songinsearch postSong={postSong} info ={info} key={info.id}/>
        )
        this.setState({tgif: tgif})
      })
      returnTopChart(songs, "spotify", '37i9dQZF1DX4RDXswvP6Mj').then((data) => {
        const kpop = data.map((info) =>
          <Songinsearch postSong={postSong} info ={info} key={info.id}/>
        )
        this.setState({kpop: kpop})
      })
    })
  }

  shouldComponentRender(nextState){
    const songChanged = this.state.song !== nextState.songs;
    const topSongChanged = this.state.topSongs !== nextState.topSongs;
    return songChanged || topSongsChanged
  }


  render() {
    return (
      <div>
        <h1 className="suggestionTitle">Suggestions<span className="period" style={{fontSize:'30px'}}>.</span></h1>
        <div className="suggestions">
          {this.state.songs}
        </div>
        <h1 className="suggestionTitle" style={{marginTop:'15px'}}>Top Charts<span className="period" style={{fontSize:'30px'}}>.</span></h1>
        <div className="suggestions">
          {this.state.topSongs}
        </div>
        <h1 className="suggestionTitle" style={{marginTop:'15px'}}>Throwback Party<span className="period" style={{fontSize:'30px'}}>.</span></h1>
        <div className="suggestions">
          {this.state.dance}
        </div>
        <h1 className="suggestionTitle" style={{marginTop:'15px'}}>Dance Party<span className="period" style={{fontSize:'30px'}}>.</span></h1>
        <div className="suggestions">
          {this.state.tgif}
        </div>
         <h1 className="suggestionTitle" style={{marginTop:'15px'}}>K-Party<span className="period" style={{fontSize:'30px'}}>.</span></h1>
        <div className="suggestions">
          {this.state.kpop}
        </div>
      </div>
    );

  }
}


