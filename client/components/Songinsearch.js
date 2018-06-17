import React, { Component } from 'react';
import Up from './Up1.js';
import Options from './svgs/options.js';
import Add from './svgs/Add.js';
import Check from './svgs/Check.js'
// import AddSong1 from './svgs/addSong1.js';
// import AddedCheck from './svgs/AddedCheck.js'
import { postSong } from '../actions/actions.js';


export default class SongInSearch extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      added: this.props.info.added
    }
  }
  returnTime(){
    let seconds = this.props.info.duration_ms/1000;
    let minutes = Math.floor(seconds/60);
    seconds = Math.floor(seconds % 60);
    if(seconds < 10){
      seconds = '0'+seconds
    }
    return <h3 className="timeBox">{minutes}:{seconds}</h3>
  }


  shouldComponentUpdate(nextState){
    return this.state.added !== nextState.added
  }

  onClickHandle(){
    postSong(this.props.info.name, this.props.info.artists, this.props.info.duration_ms, this.props.info.album.images[0].url, this.props.info.id, this.props.info.uri)
    this.setState({added: true})
  }

  render() {

    return (
          <div className="songBoxSearch" onClick={this.onClickHandle.bind(this)} style={{
              backgroundImage:`url(${this.props.info.album.images[0].url})`,
              boxShadow: "inset 0 0 0 1000px rgba(0,0,0,0.5)",
              backgroundPosition:'center',
              backgroundSize:'contain',
            }}>
            <div className="button" >
              {this.state.added ? <Check styling={"addSong1"}/> : <Add styling={"addSongWhite"}/>}
            </div>
            <div className="bottomContent">
                <h1 className="songTitle" style={{fontSize:'18px'}}>
                  {this.props.info.name}
                </h1>
                <h2 className="artistTitle">
                  {this.props.info.artists[0].name}
                </h2>
                <h3 className="timeBox">
                  {this.returnTime()}
                </h3>
              </div>
            </div>
    );
  }
}

