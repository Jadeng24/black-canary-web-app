import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {geolocated} from 'react-geolocated'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
import io from 'socket.io-client'
import config from './config'
import userIcon from './../../images/blackCanaryUser_35px.png';
import friends from './../../images/blackCanaryFriends_30px.png';

//CHANGE ONCE HOSTED
// const socket = io('http://localhost:3069')


export class MapContainer extends Component {
    
    constructor() {
        super();
        
        this.state = {
            user: {name: 'Current User', 
                    lat: 47.657362, 
                    lng: -121.824340,
                    icon: userIcon},
            key: process.env.REACT_APP_GOOGLE_API_KEY
        }
        
    }

    componentWillMount(){
        // let key = process.env.REACT_APP_GOOGLE_API_KEY
        navigator.geolocation.getCurrentPosition(position => 
            this.setState({
                user: {
                    name: 'User',
                    icon: userIcon,
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            }) 
            // {console.log(position.coords.latitude, position.coords.longitude)}
        )
    }

    render() {

        const style ={width: '70vw',
                height: '60vh',
                margin: '0 auto'};
        
        return(
            <div className="mapContain">
                <Map className="map" style={style} google={this.props.google} zoom={9} center={ {lat: this.state.user.lat, lng: this.state.user.lng}} styles={this.state.styles}>
                    <Marker icon={this.state.user.icon} name={this.state.user.name} position={{lat: this.state.user.lat, lng: this.state.user.lng}} /> 
                    <Marker icon={friends} name={this.state.user.name} position={{lat: 40.758701, lng: -111.876183}} /> 
                    
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: config.googs
})(MapContainer)
