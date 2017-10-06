import React, { Component } from 'react';
import x from '../../images/x.png';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3069');



class FriendSearchModal extends Component{
  constructor(){
    super()
    this.state={
      searchTerm: '',
      searchResults: [{firstName: 'Duck', lastName: 'Smith', username: "dontTouchMe", email: "ducky.smith@gmail.com", img:"https://unsplash.it/200/?random"},
    {firstName: 'Duck', lastName: 'Smith', username: "dontTouchMe", email: "ducky.smitawetr5y45644h@gmail.com", img:"https://unsplash.it/200/?random"}]
    }
  }

  handleChange(val){
    this.setState({
      searchTerm: val
    })
  }

  handleClick(){
    socket.emit("firstName", this.state.searchTerm)
  }

  componentDidMount(){
    socket.on("searchResults", function(data){
      console.log(data);
      this.setState({
        searchResults: data
      })
    })
  }


  render(){
    console.log(this.state.searchResults);
    const results = this.state.searchResults.map((c,i)=>{
      return (<div className='result'>
      <div className='things'>
        <img src={c.img}/>
        <button>Send Request</button>
        </div>
        <div className='text'>
          <h3>First: {c.firstName}</h3>
          <h3>Last: {c.lastName}</h3>
          <h3>Username: {c.username}</h3>
          <h4>Email: {c.email}</h4>
        </div>
      </div>)
    })

    return(
      <div className='modalContainer'>
        <img className="x" onClick={_=>this.props.toggleSearch()} src={x} alt="close"/>
        <input value={this.state.searchTerm} onChange={e=>this.handleChange(e.target.value)} className="input" placeholder='Name'></input>
        <button onClick={_=>this.handleClick()} className="friendbuttn">Search</button>

        <div className='results'>
          {results}
        </div>
      </div>
    )
  }

}
export default FriendSearchModal;
