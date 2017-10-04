import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client';
import MapContainer from './../MapContainer/MapContainer';
import Login from '../Login/Login';
import TweenMax from 'gsap';
import $ from 'jquery';
import {connect} from 'react-redux';
import {getUserInfo, getFriendsList, getGroups, getActiveLocations} from './../../ducks/reducer';
import {heartbeat, renameGroup} from './../../controllers/socketCTRL';
import bell from './../../images/bell.svg'
import map from '../../images/placeholder_map.gif'

const socket = io('http://localhost:3069');


class Home extends Component{

    componentDidMount(){
        let {getUserInfo, getFriendsList, getGroups, getActiveLocations} = this.props;

        socket.on('connect', ()=> {
            console.log('home socket id:',socket.id)
            socket.emit('save socket_id', {socketId: socket.id})
        })

        heartbeat(getFriendsList, getUserInfo, getGroups, getActiveLocations);

        // test socket
        // socket.emit('rename group', {group_name: 'i will rename this group', id: 11} )
    }



    render(){
        let {user, friends, groups, getActiveLocations} = this.props;

        return(
            <div id="Home">
                <div className="bell">
                    <Link to='/alerts'><img className="bellIcon" src={bell} alt="alert"/></Link>
                </div>

                <Login />
                <div className='navContainer'>
                    <Link to='/situations'> <p className="head">SITUATIONS</p> </Link>
                    <Link to='/profile'> <p className="head"> PROFILE</p> </Link>
                </div>
                <MapContainer style={{width: '100vw'}} />
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

let outputActions = {
    getUserInfo,
    getFriendsList,
    getGroups,
    getActiveLocations
}

export default connect(mapStateToProps, outputActions)(Home);
