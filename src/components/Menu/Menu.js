import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import x from '../../images/X.svg'

export default class Menu extends Component{
    
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="Menu">

                <div className='navigateContainer'>

                    <div className="exit">
                        <img className="x" onClick={()=> this.props.toggleMenu('exit')} src={x} alt="close"/>
                    </div>

                    <div className="homeContainer">
                        <Link to='/' onClick={()=> this.props.toggleMenu('exit')} className="home">Home</Link>
                    </div>

                    <div className="profileAndSituationsContainer">
                        <Link onClick={()=> this.props.toggleMenu('exit')} to='/profile' className="profile" > Profile</Link>

                        <Link onClick={()=> this.props.toggleMenu('exit')} to='/situations' className="situations">Situations</Link>
                    </div>

                    <div className="aboutContainer">
                        <div onClick={()=> this.props.toggleMenu('exit')} className="about">About</div>
                    </div>
                </div>
                
            </div>
        )
    }
}