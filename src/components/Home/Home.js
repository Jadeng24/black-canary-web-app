import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client';
const socket = io('http://localhost:3069');


export default class Home extends Component{

    render(){
        return(
            <div>blah
                <Link to='/profile'>go to profile</Link>
            </div>
        )
    }
}