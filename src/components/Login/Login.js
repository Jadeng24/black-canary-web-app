import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import TweenMax from 'gsap';
import $ from 'jquery';

class Login extends Component {


  userLoggedIn(){
      TweenMax.to($('#login'), 1, {'opacity': 0, ease: TweenMax.Power1.easeIn});
      TweenMax.to($('#login'), 0, {'display': 'none', delay: 1, ease: TweenMax.Power1.easeIn});
      
  }

  render() {
    return (
      <div id="login">
          Bye, React Native.
          <div>
            <a href="/auth"><button>Login</button></a>
            <Link to='/' onClick={this.userLoggedIn()}><p>go to home</p></Link>
          </div>
      </div>
    );
  }
}

export default Login;
