import React, {Component} from 'react';
import io from 'socket.io-client';
import addFriend from '../../images/addFriendIconReal.png';
import x from '../../images/x.png';
import Groups from './Groups'


export default class GroupsModal extends Component{

    constructor(){
        super()
    }

    render(){
        let {group, exit} = this.props;

        const membersOfGroup = group.friends.map((friends, i) => {
            return(
                <div>
                    <p>{friends}</p>
                </div>
            )
        })
        return(
            <div className='GroupsModal'>
                <div className="groupsBox">
                    <img className="close" onClick={exit} src={x} alt='close'/>
                    <div className="header">
                        <p>GROUP: {group.name}</p>
                    </div>
                    <div>
                        <p className="title">members:</p>
                        <div className="list">{membersOfGroup}</div>
                    </div>

                </div>
            </div>
        )
    }
}