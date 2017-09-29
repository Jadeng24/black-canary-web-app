import React, {Component} from 'react'
import io from 'socket.io-client';
const socket = io('http://localhost:3069');

export default class Situations extends Component{

    render(){
        return(
            <div className='Situations'>
                <p>this is the situations page</p>
            </div>
        )
    }
}
