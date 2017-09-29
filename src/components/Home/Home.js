import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client';

import map from '../../images/placeholder_map.gif'

const socket = io('http://localhost:3069');

export default class Home extends Component{

    render(){
        return(
            <div className="Home">
                <div className='navContainer'>
                    <Link to='/situations'> <p className="head">SITUATIONS</p> </Link>
                    <Link to='/situations'> <p className="head"> PROFILE</p> </Link>
                    <Link to='/situations'> <p className="head">LOGIN</p> </Link>
                </div>
                <div className="mapContainer">
                    <img className="map" src={map} alt="map"/>
                </div>
            </div>
        )
    }
}