import React, {Component} from 'react';
import io from 'socket.io-client';

import addGroup from '../../images/addFriendIconReal.png';
import x from '../../images/x.png';
import GroupsModal from './GroupsModal'

const socket = io('http://localhost:3069');

export default class Groups extends Component{
    constructor(){
      super()
      this.state={
        groupName: [
            {name: 'urMom',
              friends: ['Abby', 'Janise', 'Emily', 'Duck Smith', 'Carl']},
            {name: 'HAlp',
              friends: ['Abby', 'Janise', 'Ethan', 'Spencer', 'Emily']},
            {name: 'Emergency Contacts',
              friends: ['Monday', 'Jocelyn', 'Bailey']},
        ],
        groupModal: false,
        newGroup: {name: "", friends:[]}
      }
      this.showModalMethod = this.showModalMethod.bind(this)
      this.exit = this.exit.bind(this)
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
        this.setState({
            groupModal: false
        })
    }

render(){

  const allGroups = this.state.groupName.map((group,i) => {
        return (
        <div className='listOfGroups' key={i}>
            <div className="nameContainer">
                <p className='groupName'>{group.name}</p>
                <button className="seeInfo" onClick={_=>this.showModalMethod(group)}>SEE INFO</button>
            </div>

        </div>
        )
  })
  return(
      <div className='Groups'>
        <div className='header'>
          <header className='head'>GROUPS</header>
          <img className="addGroup"src={addGroup} alt="addFriendIcon"/>
        </div>
              {
              !this.state.groupModal
              ?
                <div>{allGroups}</div>
              :
              <GroupsModal exit={this.exit} group={this.state.group}/>
            }
      </div>
  )
}
}
