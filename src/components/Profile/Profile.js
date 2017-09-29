import React, {Component} from 'react'
import io from 'socket.io-client';
const socket = io('http://localhost:3069');

export default class Profile extends Component{

    render(){
        return(
            <div>
                this is the profile
            </div>
        )
    }
}