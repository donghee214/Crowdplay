import React, { Component } from 'react';
// import { connect } from 'react-redux';

export default class InputSearch extends React.Component  {
  constructor(props){
    super(props)
    this.state ={
      inputValue : '',
    }
  }

  updateInputValue(event){
    this.setState({inputValue: event.target.value});
    this.props.search(null, event.target.value)
  }

  // search(evt){
  //   evt.target.children[0].blur()
  //   evt.preventDefault();
  //   // const {dispatch} = this.props;
  //   // dispatch(search(this.state.inputValue))
  //   this.setState({showResults:true, enterDown:true})
  //   return false;
  // }
  clickHandle(evt){
     this.props.search(evt, this.state.inputValue)
  }
  // constructor(props){
  //   super(props)
  //   this.state = {play: this.props.isPlaying}
  // }


  // componentDidMount(){
  //   //write cconondition to check database and see if there are any songs
  //   //if there is not render big add button
  //   //else 
  // }

  render() {

    return (
      <div style={{width:'100%'}}>
        <form onSubmit={(e) => this.clickHandle(e)}>
            <input className="inputRoom searchSong" placeholder = "Search" type="text" value={this.state.inputValue} onChange={this.updateInputValue.bind(this)}/>
        </form>
      </div>
    );
  }
}


