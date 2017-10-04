import React, {Component} from 'react'
import Alert from './Alert'

export default class AlertBubble extends Component{


    render(){
        return(
            <div className="alertBubble">
                    {this.props.state.map(function(value, index){
                        return(
                    <div className="container" key={index}>
                        <p className="from">{value.from}</p>
                        <div className="messageContainer">
                            <p className="message">{value.message}</p>
                            <p>map goes here</p>
                        </div>
                    </div>)
                    })}
            </div>  
        )
    }
}