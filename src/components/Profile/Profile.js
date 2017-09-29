import React, {Component} from 'react'
import io from 'socket.io-client';
const socket = io('http://localhost:3069');

export default class Profile extends Component{

    componentDidMount(){
        socket.emit('save socket_id', {socketID: socket.id})
    }

    render(){
        return(
            <div>
                this is the profile
            </div>
        )
    }
}