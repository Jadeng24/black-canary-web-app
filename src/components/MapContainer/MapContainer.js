import React, {Component} from 'react'
import {Link} from 'react-router-dom'
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
            canary: {
                name: '',
                lat: 40.226192, //DevMtn
                lng:  -111.660776, //DevMtn
                icon: userIcon
            },
            style: {
                width: '100vw',
                height: '60vh',
                margin: '0'
            }
        }

    }

    moveJanise(){
        setInterval(() => {
            
            let janise = Object.assign({}, this.state.canary)
            janise.lng += 0.1;
            janise.lat += 0.01;
            this.setState({
                canary: janise
            })
        }, 1000);
    }

    componentWillReceiveProps(props){
        // console.log(props);
        if (props.isHome) {
            let canary = props.canary;
            canary.icon = userIcon;
            this.setState({
                canary: canary
            })
            //update to be set Interval
            
        } else {
            let canary = props.canary;
            canary.icon = friends;
            this.setState({
                canary: canary,
                style: {
                    width: '310px',
                    height: '400px',
                    margin: '0'
                }
            })
        }
        
    }
    
    render() {

        return(
            <div className="mapContainer" style={this.props.styleMapContainer}>
                <Map className="map" style={this.state.style} google={this.props.google} zoom={8} center={ {lat: this.state.canary.lat, lng: this.state.canary.lng}}>
                    <Marker icon={this.state.canary.icon} name={this.state.canary.name} position={{lat: this.state.canary.lat, lng: this.state.canary.lng}} />
                </Map>
            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: config.googs
})(MapContainer)