import React, {Component} from 'react'
import AlertBubble from './AlertBubble'

export default class Alert extends Component{

        constructor(){
        super()
        
        this.state={
            
            alerts:[
                {from: 'mom', message: 'help, man following me'}
            ]
        }
    }



    render(){
        return(
            <div className="Alert">
                <div className="header">
                    <p>alerts</p>
                </div>
                <AlertBubble state={this.state.alerts}/>
            </div>
        )
    }
}

