import React, {Component} from 'react';
import io from 'socket.io-client';
import addFriend from '../../images/addFriendIconReal.png';
import x from '../../images/x.png';
import Groups from './Groups'


export default class GroupsModal extends Component{

    constructor(props){
        super(props)
    }

    render(){
        let {group, exit} = this.props;
        return(
            <div className='GroupsModal'>
                <div className="groupsBox">
                    <img onClick={exit} className="close" src={x} alt='close'/>
                    <div className="header">
                        <p>GROUP: {group.name}</p>

                        <p>{group.friends}</p>
                    </div>

                </div>
            </div>
        )
    }
}