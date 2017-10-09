import React, {Component} from 'react';
import io from 'socket.io-client';

import addGroup from '../../images/addFriendIconReal.png';
import GroupsModal from './GroupsModal'
import editIcon from '../../images/addFriendIconReal.png'
import TweenMax from 'gsap';
import $ from 'jquery';
import x from '../../images/X.svg'
import {connect} from 'react-redux'

const socket = io('http://localhost:3069');

class Groups extends Component{
    constructor(){
      super()
      this.state={
        friends: [{name: 'abby'}, {name: 'abby'}, {name: 'abby'}, {name: 'abby'}],
        groupModal: false,
        newGroupName: "", 
        friendsInGroup: []
      }
      this.showModalMethod = this.showModalMethod.bind(this)
      this.exit = this.exit.bind(this)
      this.addNewGroupModal = this.addNewGroupModal.bind(this)
      this.toggleGroupAdd = this.toggleGroupAdd.bind(this)
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange(){
      console.log('new name')
      this.setState({
        
      })
    }

    showModalMethod(group){
      this.setState({
        groupModal: true,
        group
      })
    }

    addNewGroup(){
      this.setState({
        newGroup: {}
      })
    }

    exit(){
        console.log('exit')
        this.setState({
            groupModal: false
        })
    }

    addNewGroupModal(input){
      if(input==="show"){
        this.setState({
          AddGroupModal: true
        })
      }else if(input==="hide"){
        this.setState({
          AddGroupModal: false
        })
      }
    }

    toggleGroupAdd(event, friendID) {
      event.preventDefault();

      let index = this.state.friendsInGroup.indexOf(friendID);

      let r = this.state.friendsInGroup.slice(0);
      if(index >= 0) {
          //remove from recip and change color back
          TweenMax.to($(`#${friendID}`), 0, { backgroundColor: 'rgba(239, 239, 239, 0.3)', color: '#efefef', ease: TweenMax.Power1.easeInOut})
          r.splice(index, 1);
      } else {
          //to recip, change color
          TweenMax.to($(`#${friendID}`), 0, { backgroundColor: '#fef36e', color: '#111', ease: TweenMax.Power1.easeInOut})
          r.push(friendID);
      }
      this.setState({
          friendsInGroup: r
      })
  }



render(){

  let {groups, friends} = this.props

  const allGroups = groups.map((group,i) => {
        return (
        <div className='listOfGroups' key={i}>
            <div className="nameContainer">
                <p className='groupName'>{group.groupName}</p>
                <button className="seeInfo" onClick={_=>this.showModalMethod(group)}>SEE INFO</button>
            </div>

        </div>
        )
  })
  return(
      <div className='Groups'>

          <div className='header'>
            <p>GROUPS</p>
            <img onClick={_=>this.addNewGroupModal("show")} className="addNewGroup" src={editIcon} alt=""/>
          </div>

          {
            !this.state.AddGroupModal
            ?
            null
            :
            <div className="addGroupModal">
              <div className="modalBox">
                <img className="exit" onClick={_=>this.addNewGroupModal("hide")} src={x} alt="close"/>
                <p className="head">ADD NEW GROUP</p>

                <div className="inputField">
                  <p className="btn">GROUP NAME:</p>
                  <input onChange={this.handleChange} type="text"/>
                </div>

              <div className='groupsBoxContainer'>
                  <p>ADD GROUP MEMBERS:</p>
                  <div className="groupsbox">
  
                      {friends.map((e, i) => {
                        return <button className="friendNames" key={i} id={e.friend_user_id} onClick={event => this.toggleGroupAdd(event, e.friend_user_id)}>{e.friend_username}</button>
                      })}     
                  </div>

              </div>
                      <div className="addBtns">
                        <button className='added'>ADD NEW GROUP</button>
                      </div>
              </div>
            </div>
          }

            {

              !this.state.groupModal
              ?
                <div>{allGroups}</div>
              :
              <GroupsModal exit={this.exit} group={groups}/>
            }
      </div>
  )
}
}

function mapStateToProps(state){
  return state
}

let outputActions = {}

export default connect(mapStateToProps, outputActions)(Groups)