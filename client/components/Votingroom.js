import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header.js';
import Add from './Add.js';
import FirstSong from './FirstSong.js';
import Song from './Song.js';
import {
  orderSongs,
  number,
  order,
  reorder,
  getCurrent,
  watchGuestAddedEvent,
  toggleLoadSongs,
  addSongsDone,
  voteListener
} from '../actions/actions'

class Votingroom extends Component  {
  constructor(props){
      super(props)
      this.state = {
        noSongs: false,
        currentSongs: 0,
        nums:0,
        upNextHeight: 50,
        songData: null,
        newSongData: null,
        songList: [],
        isPlaying: false,
        createBoxes: true,
        noSongs: true,
        initialMount: false,
        context: null,
        title:'No Song Chosen', 
        artist: null, 
        timeBox:null, 
        background:null,
        coor1:[50,0],
        coor2:[0,50],
        coor3:[50,50],
        coor4:[0,100],
        coor5:[50,100],
        coor6:[0,150],
        coor7:[50,150],
        coor8:[0,200],
        coor9:[50,200],
        grid: {
        '0':[50,0],
        '1':[0,50],
        '2':[50,50],
        '3':[0,100],
        '4':[50,100],
        '5':[0,150],
        '6':[50,150],
        '7':[0,200],
        '8':[50,200],
        }

      }
      this.grid ={
        '0':[50,0],
        '1':[0,50],
        '2':[50,50],
        '3':[0,100],
        '4':[50,100],
        '5':[0,150],
        '6':[50,150],
        '7':[0,200],
        '8':[50,200],
      }
      

    }
    componentDidMount(){
       this.props.onOrderSongs()
    }

    // createSongList(){
    //     console.log(this.props.Votingroom)
    //     const list = this.props.Votingroom.list.map((info, index) =>
    //         <Song info = {info} position={this.state.grid[index]}/>
    //     );
    //     this.returnList(list)
    //     console.log('CREATE')
    // }

    // addSongList(){
    //     if(this.state.songList.length ===0){
    //       this.createSongList()
    //     }
    //     else{
    //       let newList = this.state.songList.slice(0)
    //       let length = this.props.Votingroom.list.length
    //       newList.push(<Song info={this.props.Votingroom.list[length]} postiion={this.state.grid[length]}/>)
    //       this.returnList(newList)
    //     }
    // }

  // returnList(list){
  //   console.log(list)
  //   return list
  // }

  // componentDidUpdate(){
  //   if(this.props.Votingroom.type === 'song')
  //       this.addSongList()
  // }

  // shouldComponentUpdate(){
  //   return true
  // }

  
  updateMainSong(){
    getCurrent().then(function(details){
      console.log(details)
      this.setState({
        title: details[0].name, 
        artist: details[0].artists[0].name, 
        timeBox:details[0].duration_ms, 
        background:details[0].album.images[0].url,
        isPlaying: details[0].is_playing,
        context: details[1]
      })
    }.bind(this))
  }

  render() {
    console.log(this.props)
    if(this.props.Votingroom.loading){
      return <h1>
        Loading
      </h1>
    }
    
    return (

      <div>
        <div className="currentlyPlaying">
          <Header /> 
          <FirstSong context ={this.state.context}isPlaying ={this.state.isPlaying} firstSong={this.props.Votingroom.list[0]} updateMainSong ={this.updateMainSong.bind(this)} background={this.state.background} timebox={this.state.timeBox} artist ={this.state.artist} title={this.state.title} roomType={this.props.roomType}/>
        </div>
        <div style={{display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width:'100%',
                    height: '50vw',

          }}>
          <div className="refresh">
            <svg fill="#1ED760" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </div>
        </div>
        <div className="upNext" style={{height:this.state.upNextHeight + 'vw'}}>
            <Add searchClicked={this.props.searchClicked} style="addContainerSong"/>}
            {this.props.Votingroom.list.map((info, index) =>
                <Song userId={this.props.Votingroom.user} key={this.props.Votingroom.list[index].songId} votes={this.props.Votingroom.list[index].votecount}info = {info} position={this.state.grid[index]}/>
            )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    Votingroom: state.songList
  };
}

function mapDispatchToProps(dispatch) {
  watchGuestAddedEvent(dispatch);
  voteListener(dispatch)
    return {
    onOrderSongs() {
      return dispatch(orderSongs())
    },
    addSongsDone(){
      return dispatch(addSongsDone())
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Votingroom);