import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client';
import MapContainer from './../MapContainer/MapContainer';
import Login from '../Login/Login';
import TweenMax from 'gsap';
import $ from 'jquery';

import map from '../../images/placeholder_map.gif'

const socket = io('http://localhost:3069');


export default class Home extends Component{

    componentDidMount(){
        socket.on('connect', ()=> {
            console.log(socket.id)
            socket.emit('save socket_id', {socketId: socket.id})
        })
    }



    render(){
        return(
            <div id="Home">
                <Login />
                <div className='navContainer'>
                    <Link to='/situations'> <p className="head">SITUATIONS</p> </Link>
                    <Link to='/profile'> <p className="head"> PROFILE</p> </Link>
                    <a href='http://localhost:3069/auth/logout'> <p className="head">LOGOUT</p> </a>
                </div>
                <MapContainer style={{width: '100vw'}} />
            </div>
        )
    }
}
