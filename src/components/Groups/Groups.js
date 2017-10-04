import React, {Component} from 'react';
import io from 'socket.io-client';
import addFriend from '../../images/addFriendIconReal.png';
import GroupsModal from './GroupsModal'
import x from '../../images/x.png';

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
        groupModal: false
      }
      this.showModalMethod = this.showModalMethod.bind(this)
      this.exit = this.exit.bind(this)
    }

    exit(){
        this.setState({
            groupModal: false
        })
    }

    showModalMethod(group){
      this.setState({
        groupModal: true,
        group
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
            <p>GROUPS</p>
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
