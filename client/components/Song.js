import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Motion, spring} from 'react-motion';
import Up from './Up1.js';
import Down from './svgs/down.js';

import {
  increment,
  getVote,
  getId,
  upvote

} from '../actions/actions'

class Song extends Component  {
    constructor(props){
    super(props)
      this.state = {userId: getId(), name:"songBoxUp"}

  }

  // componentDidMount(){
  //   if(this.props.userId in this.props.info.voters && this.props.info.voters[this.props.userId]){
  //     this.setState({name:'songBoxUpGreen'})
  //   }
  // }


  toggle(){
    // this.setState({name: "songBoxUpGreen"})
    increment(this.props.info.songId, this.state.userId);
  }

  unToggle(){
    this.setState({name: "songBoxUpGreen"})
  }

  upvote(){
    increment(this.props.info.songId, this.state.userId)
  }



  downvote(){
    // alert('downvote')
  }
  render() {

    // const {dispatch} = this.props
    console.log(this.props)
    return (

        <Motion style={{ x: spring(true ? -8 : 11) }}>
            {value => {
                return <div className="songBox" style={{
                  background:`rgba(0,0,0,0.5) url(${this.props.info.picture})`,
                  top: 0,
                  boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.3)',
                  backgroundPosition:'center',
                  backgroundSize:'contain',
                  left:0,
                  WebkitTransform: `translate3d(${this.props.position[0]}vw, ${this.props.position[1]}vw, 0)`,
                  transform: `translate3d(${this.props.position[0]}vw, ${this.props.position[1]}vw, 0)`,
                }}>
                <div className="votes">
                  <button>
                    <Up toggle ={this.toggle.bind(this)} userId={this.props.userId} voters={this.props.info.voters}/>
                 </button>
                    <h2 className="value">
                      {this.props.votes}
                    </h2>
                  <button>
                     <Down style={"songBoxDown"} dropvote ={this.downvote.bind(this)}/>
                  </button>
                </div>
                <div className="bottomContent">
                    <h1 className="songTitle">
                      {this.props.info.SongName}
                    </h1>
                    <h2 className="artistTitle">
                      {this.props.info.artist[0].name}
                    </h2>
                    <h3 className="timeBox">
                      {this.props.info.time}
                    </h3>
                  </div>
                </div>
            } }
        </Motion>
    );
  }
}


export default connect(state => state)(Song);

