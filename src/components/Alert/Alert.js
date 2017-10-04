import React, {Component} from 'react'
import AlertBubble from './AlertBubble'

export default class Alert extends Component{

        constructor(){
        super()
        
        this.state={
            
            alerts:[
                {situation: 'uncomfortable', from: 'Andi', message: 'plz hlp, Lloyd scary'},
                {situation: 'on a date', from: 'Alan', message:'she wants sample cups of me pee'},
                {situation: 'running', from: 'Janise', message: 'guys Im running'},
                {situation: 'emergency', from: 'mom'}
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

