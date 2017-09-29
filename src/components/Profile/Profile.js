import React, {Component} from 'react'
import io from 'socket.io-client';
import editIcon from '../../images/whiteEditIcon.svg'

const socket = io('http://localhost:3069');

export default class Profile extends Component{

    constructor(){
        super()

        this.state={
            name: 'Abigail Thelin'
        }
    }

    render(){
        return(
            <div className="Profile">
                <div className='nameContainer'>
                    <div className="name">{this.state.name}</div>
                    <img className="editIcon" src={editIcon} alt="edit"/>
                </div>
                <div className="imgContainer">
                    <div className="imgPlaceholder"></div>
                </div>
            </div>
        )
    }
}