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
                lat: 40.384859, //40.226192, //DevMtn
                lng:  -111.640692, //-111.660776, //DevMtn
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
            // let friends = this.state.friends.slice(0);
            // console.log(friends);
            // let janise = Object.assign({},this.state.friends[1]);
            // janise.lng += 0.1;
            // friends.splice(1, 1, janise);
            // this.setState({
            //     friends: friends
            // })
            let janise = Object.assign({}, this.state.canary)
            janise.lng += 0.1;
            janise.lat += 0.01;
            this.setState({
                canary: janise
            })
        }, 1000);
    }

    // moveAbby(){
    //     setInterval(() => {
    //         let friends = this.state.friends.slice(0);
    //         console.log(friends);
    //         let abby = Object.assign({},this.state.friends[2]);
    //         abby.lat += 0.1;
    //         abby.lng -= 0.001;
    //         friends.splice(2, 1, abby);
    //         this.setState({
    //             friends: friends
    //         })
    //     }, 2*60*1000);
    // }
    componentWillMount(){
        if (this.props.isHome) {
            navigator.geolocation.getCurrentPosition(position =>
                this.setState({
                    canary: {
                        name: 'User',
                        icon: userIcon,
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
            )
        } else {
            let canary = this.props.canary;
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
    componentDidMount() {
        if(this.state.canary.name === 'Janise') {
            this.moveJanise();
        }
        // this.moveAbby();
    }
    render() {

        // const style ={};
        return(
            <div className="mapContainer" style={this.props.styleMapContainer}>
                <Map className="map" style={this.state.style} google={this.props.google} zoom={8} center={ {lat: this.state.canary.lat, lng: this.state.canary.lng}}>
                    <Marker icon={this.state.canary.icon} name={this.state.canary.name} position={{lat: this.state.canary.lat, lng: this.state.canary.lng}} />
                    {/*this.state.friends.map(e => {
                        return <Marker key={e.name} icon={e.icon} name={e.name} position={{lat: e.lat, lng: e.lng}} />
                    })
                     */}
                </Map>
            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: config.googs
})(MapContainer)


// user: {name: 'Current User',
            //         lat: 47.657362,
            //         lng: -121.824340,
            //         icon: userIcon},
            // friends: [
            //     {
            //         name: 'Andi',
            //         lat: 48.657362,
            //         lng: -121.824340,
            //         icon: friends
            //     },
            //     {
                    // name: 'Janise',
                    // lat: 37.437793,
                    // lng: -122.133636,
                    // icon: friends
            //     },
            //     {
            //         name: 'Abby',
            //         lat: 40.33503,
            //         lng: -111.708984,
            //         icon: friends
            //     },
            //     {
            //         name: 'Alan',
            //         lat: 80.43033,
            //         lng: -93.867187,
            //         icon: friends
            //     }
            // ],