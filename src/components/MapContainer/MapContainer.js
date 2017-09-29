import React, {Component} from 'react'
import {Link} from 'react-router-dom'
// import {geolocated} from 'react-geolocated'
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
            friends: [
                {
                    name: 'Andi', 
                    lat: 48.657362, 
                    lng: -121.824340,
                    icon: friends
                },
                {
                    name: 'Janise', 
                    lat: 37.437793, 
                    lng: -122.133636,
                    icon: friends
                },
                {
                    name: 'Abby', 
                    lat: 40.33503, 
                    lng: -111.708984,
                    icon: friends
                },
                {
                    name: 'Alan', 
                    lat: 80.43033, 
                    lng: -93.867187,
                    icon: friends
                }

            ],

        }
        
    }

    moveJanise(){
        setInterval(() => {
            let friends = this.state.friends.slice(0);
            console.log(friends);
            let janise = Object.assign({},this.state.friends[1]);
            janise.lng += 0.1;
            friends.splice(1, 1, janise);
            this.setState({
                friends: friends
            })
        }, 1000);
    }

    componentWillMount(){
        navigator.geolocation.getCurrentPosition(position => 
            this.setState({
                user: {
                    name: 'User',
                    icon: userIcon,
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            }) 
            
        )
    }

    componentDidMount() {
        this.moveJanise();
    }

    render() {

        const style ={width: '70vw',
                height: '60vh',
                margin: '0 auto'};
        
        return(
            <div className="mapContainer">
                <Map className="map" style={style} google={this.props.google} zoom={8} center={ {lat: this.state.user.lat, lng: this.state.user.lng}} styles={this.state.styles}>
                    <Marker icon={this.state.user.icon} name={this.state.user.name} position={{lat: this.state.user.lat, lng: this.state.user.lng}} /> 
                    {this.state.friends.map(e => {
                        return <Marker key={e.name} icon={e.icon} name={e.name} position={{lat: e.lat, lng: e.lng}} />
                    })
                     }
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: config.googs
})(MapContainer)
