import React, {Component} from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:3069');


export default class Contacts extends Component{
    constructor(){
        super()
        this.state={

        }
    }

    render(){
        return(
            <div className="Contacts">
                <p>FRIENDS</p>
            </div>
        )
    }
}