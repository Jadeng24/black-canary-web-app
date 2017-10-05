import React, {Component} from 'react'
import AlertBubble from './AlertBubble'

export default class Alert extends Component{


    render(){
        return(
            <div className="Alert">
                <div className="header">
                    <p>alerts</p>
                </div>
                <AlertBubble/>
            </div>
        )
    }
}

