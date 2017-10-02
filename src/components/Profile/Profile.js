import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client';
import editIcon from '../../images/whiteEditIcon.svg'


// eslint-disable-next-line
const socket = io('http://localhost:3069');

export default class Profile extends Component{
    constructor(){
        super()

        this.state={
            name: 'Abigail Thelin',
            changeName: '',
            toggleNameInput: false
        }
        this.toggleName = this.toggleName.bind(this)
        this.addedNewName = this.addedNewName.bind(this)
    }

    toggleName(){
        this.setState({
            toggleNameInput: true
        })
    }

    addedNewName(){
        this.setState({
            toggleName: false
        })
    }
    
    componentDidMount(){
        socket.emit('save socket_id', {socketID: socket.id})
    }

    render(){
        return(
            <div className="Profile">

                {
                    !this.state.toggleNameInput
                    ?
                    <div className='nameContainer'>
                        <div className="name">{this.state.name}</div>
                        <img className="editIcon" onClick={this.toggleName} src={editIcon} alt="edit"/>
                    </div>
                    
                    :
                    <div className="nameInputContainer">
                        <input className="nameInput" type="text"/>
                        <p onClick={this.addedNewName} className="addNewNameBtn">ADD</p>
                    </div>
                }

                <div className="imgContainer">
                    <div className="imgPlaceholder"></div>
                </div>
                
                <div className="safehavenContainer">
                    SAFEHAVEN:
                </div>


                <div className="navigationBtns">
                    <Link to="/Home"> <p className="btn">GO TO CONTACTS</p> </Link>
                    <Link to="/Home"> <p className="btn">GO TO GROUPS</p> </Link>
                    <Link to={"/login"}> <p className="deleteBtn">DELETE YOUR ACCOUNT</p> </Link>
                </div>
            </div>
        )
    }
}