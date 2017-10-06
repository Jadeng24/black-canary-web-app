import React, {Component} from 'react';
import io from 'socket.io-client';
import addFriend from '../../images/addFriendIconReal.png';
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
        friends:{name: 'abby', name: 'abby', name: 'abby', name: 'abby', name: 'abby'},
        groupModal: false,
        AddGroupModal: false
      }
      this.showModalMethod = this.showModalMethod.bind(this)
      this.exit = this.exit.bind(this)
      this.addNewGroupModal = this.addNewGroupModal.bind(this)
      this.toggleFriendAdd = this.toggleFriendAdd.bind(this)
    }


    showModalMethod(group){
      this.setState({
        groupModal: true,
        group
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

    toggleFriendAdd(event, groupObj) {
      let index = -1;
      for (let i = 0; i < this.state.groupsToAdd.length; i++){
          if (this.state.groupsToAdd[i].name === groupObj.name) {
              index = i;
          }
      }

      let r = this.state.groupsToAdd.slice(0);
      if(index >= 0) {
          //remove from recip and change color back
          TweenMax.to($(`#${groupObj.name}`), 0, { backgroundColor: 'rgba(239, 239, 239, 0.3)', color: '#efefef', ease: TweenMax.Power1.easeInOut})
          r.splice(index, 1);
      } else {
          //to recip, change color
          TweenMax.to($(`#${groupObj.name}`), 0, { backgroundColor: '#fef36e', color: '#111', ease: TweenMax.Power1.easeInOut})
          r.push(groupObj);
      }
      this.setState({
          groupsToAdd: r
      })
      // console.log(this.state.groupsToAdd)
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
                <p className="head" >ADD NEW GROUP</p>

                <div className="inputField">
                  <input type="text"/>
                  <button className="btn">ADD GROUP NAME</button>
                </div>

                <div className="inputField">
                  <p>ADD GROUP MEMBERS</p>
                  <div className="groupsbox">
                         {/* {this.state.friends.map((e, i) => {
                        return <button className="friendNames" key={i} id={e.freindid} onClick={event => this.toggleGroupAdd(event, e)}>{e.groupName.toUpperCase()}</button>
                      })}    */}
                  </div>
                </div>
                      <div>
                        <button>ADD GROUP TO GROUPS</button>
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