import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import TweenMax from 'gsap';
import $ from 'jquery';
import logo from './../../images/canaryLogo.svg';

class Login extends Component {

  // componentWillMount() {
  //   console.log($('#spotlight1').css('top'))
  // }
  componentDidMount() {
    let top = $('#spotlight1').css('top');
    let left = $('#spotlight1').css('left');
    // console.log($('#spotlight2').css('top'), $('#spotlight2').css('left'));
    TweenMax.to($('#spotlight1'), 0, {'top': '-100vh', 'left': '100vw', delay: -1})
    TweenMax.to($('#spotlight2'), 0, {'top': '100vh', 'left': '-50vw', delay: -1})
    TweenMax.to($('#spotlight1'), 1.5, {'top': '50vh', 'left': '10vw', delay: 1, ease: TweenMax.Power4.easeOut})
    TweenMax.to($('#spotlight2'), 1.5, {'top': '-40vh', 'left': '40vw', delay: 1, ease: TweenMax.Power4.easeOut})
    TweenMax.to($('#spotlight1'), 1.5, {'top': top, 'left': left, delay: 2, ease: TweenMax.Power4.easeInOut})
    TweenMax.to($('#spotlight2'), 1.5, {'top': top, 'left': left, delay: 2, ease: TweenMax.Power4.easeInOut})
  }

  userLoggedIn(){
      TweenMax.to($('#login'), 1, {'opacity': 0, ease: TweenMax.Power1.easeIn});
      TweenMax.to($('#login'), 0, {'display': 'none', delay: 1, ease: TweenMax.Power1.easeIn});
      
  }

  render() {
    return (
      <div id="login">
          <div className="loginWrapper">
            <div className="imgWrapper">
              <div id="spotlight1"></div>
              <div id="spotlight2"></div>              
              <img src={logo}/>
            </div>
            <div className="infoWrapper">
              <a href="http://localhost:3069/auth"><button>LOGIN OR SIGN UP</button></a>
              {/*REMOVE THE LINK ONCE ALL IS SET UP*/}
              <Link to='/' onClick={this.userLoggedIn()}><p>Go to home</p></Link>
            </div>
          </div>
      </div>
    );
  }
}

export default Login;
