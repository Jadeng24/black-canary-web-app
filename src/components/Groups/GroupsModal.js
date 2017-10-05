import React, {Component} from 'react';
import io from 'socket.io-client';
import addFriend from '../../images/addFriendIconReal.png';
import x from '../../images/x.png';
import Groups from './Groups'


export default class GroupsModal extends Component{

    constructor(props){
        super(props)

        this.state={
            friends: props.group.friends
        }
        this.deleteFriendFromGroup = this.deleteFriendFromGroup.bind(this)
    }

    deleteFriendFromGroup(i){
        let friends=[...this.state.friends]
        friends.splice(i, 1) 
        this.setState({
            friends 
        })
    }


    render(){
        let {group, exit} = this.props;
        console.log(exit)

        const membersOfGroup = this.state.friends.map((friends, i) => {
            return(
                <div className="singleFriend" key={i}>
                    <p>{friends}</p>
                    <img className="deleteFriend" onClick={_=>this.deleteFriendFromGroup(i)} src={x} alt="delete"/>

                </div>
            )
        })
        return(
            <div className='GroupsModal'>
                <div className="groupsBox">
                    <div className="header">
                        <div className="closeModal">
                          <img className="close" onClick={_=>exit()} src={x} alt='close'/>
                        </div>
                        <p className="head">GROUP: {group.name}</p>
                    </div>
                    <div>
                        <p className="title">members:</p>
                        <div className="list">{membersOfGroup}</div>
                    <button className="deleteButton">DELETE THIS GROUP</button>
                    </div>

                </div>
            </div>
        )
    }
}