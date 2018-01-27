import React, { Component } from 'react';
import { connect } from 'react-redux';
import Controls from './Controls.js';
import {
  getMyInfo,
  order,
  remove
} from '../actions/actions'

class FirstSong extends Component  {
  constructor(props){
      super(props)
      this.state = {noSongs: true, title:'No Song Chosen', artist: null, timeBox:null, background:null}
    }
  componentDidMount(){
    if(this.props.roomType){
      const {dispatch} = this.props
      dispatch(getMyInfo())
    }
  }

  showTopSong(){
    // order().then(function(orderlist){
    //   this.setState({
    //     title: SongName,
    //     artist: artist[0].name,
    //     timeBox: time
    //   })
    //   console.log(orderlist)
    // })

    //  order().then(function(orderlist){
    //   remove(orderlist[0].songId)
    //   this.setState({
    //     title: orderlist[0].SongName,
    //     artist: orderlist[0].artist[0].name,
    //     timeBox: orderlist[0].time,
    //     background: orderlist[0].picture,
    //     backgroundPosition:'center',
    //     backgroundSize: 'contain'
    //   })
    //   // console.log(orderlist)
    // }.bind(this)
      
    // )
  }
  render() {
    return (
      <div>
        {this.props.roomType ? <Controls context={this.props.context} isPlaying={this.props.isPlaying} firstSong={this.props.firstSong} updateMainSong={this.props.updateMainSong} background ={this.props.background} showTopSong ={this.showTopSong.bind(this)}/> : null}
        <div className="bottomContent" style= {{height:'20%'}}>
          <h1 className="songTitle">
            {this.props.title}
          </h1>
          <h2 className="artistTitle">
            {this.props.artist}
          </h2>
          <h3 className="timeBox">
            {this.props.timebox}
          </h3>
        </div>
      </div>
    );
  }
}


export default connect(state => state)(FirstSong);