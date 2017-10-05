import React, {Component} from 'react'
import Alert from './Alert'
import MapContainer from './../MapContainer/MapContainer';
import TweenMax from 'gsap'
import $ from 'jquery'

export default class AlertBubble extends Component{


    componentDidMount() {
        TweenMax.to($('.messageContainer'), 0, {height: '0', opacity: 0});
        TweenMax.to($('.mapHere'), 0, { opacity: 0});
        TweenMax.to($('.mapHere .map'), 0, {position: 'relative'});
    }

    toggleAlert(index) {
        if ($(`#${index} .messageContainer`).css('height') !== '500px'){
            TweenMax.to($(`#${index}`), 1, {backgroundColor: '#d13030'});
            TweenMax.to($(`#${index} .messageContainer`), 1, {height: '500px', opacity: 1});
            TweenMax.to($(`#${index} em`), 1, {transform: 'rotate(45deg)'});
            TweenMax.to($(`#${index} .mapHere`), 0.5, {opacity: 1, delay: 1});

        } else {
            TweenMax.to($(`#${index}`), 1, {backgroundColor: 'none'});            
            TweenMax.to($(`#${index} .mapHere`), 0.5, {opacity: 0, delay: 0});    
            TweenMax.to($(`#${index} em`), 1, {transform: 'none'});                    
            TweenMax.to($(`#${index} .messageContainer`), 1, {height: '0', opacity: 0, delay: 0.5});
        }
    }

    render(){
        return(
            <div className="alertBubble">
                    {this.props.alerts.map((alert, index) => {
                        return (
                            <div className="container" key={index} id={index}>
                                <p className="from"><em onClick={() => this.toggleAlert(index)}>+</em> {alert.from}</p>
                                <div className="messageContainer">
                                    <p className="message">{alert.message}</p>
                                    <div id={`mapHere${index}`} className="mapHere" style={{width: '310px', height: '400px'}}>
                                        <MapContainer isHome={false} styleMapContainer={{width: '310px', height: '400px'}} canary={{name: 'Janise', lat: 37.437793, lng: -122.133636}}/>
                                    </div>
                                </div>
                            </div>)
                    })}
            </div>  
        )
    }
}