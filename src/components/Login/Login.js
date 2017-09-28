import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import '../../main.css';

class Login extends Component {
  render() {
    return (
      <div className="App">
          Bye, React Native.
          <a href="/auth"><button>Login</button></a>
          <Link to='/home'><p>go to home</p></Link>
      </div>
    );
  }
}

export default Login;
