import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './main.css';
import hamburger from './images/pngHamburger.png'
import Menu from './components/Menu/Menu'
import router from './router'


class App extends Component {
  
  constructor(){
    super()
    this.state={
      menuModal: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu(input){
    if(input ==='on'){
      this.setState({
        menuModal: true
      })
    }else if(input ==='exit'){
      this.setState({
        menuModal: false
      })
    }
  }

  render() {
    return (
     <div className="App">

        {
          !this.state.menuModal
          ?
            <img className="menu" src={hamburger} alt="menu" onClick={()=>this.toggleMenu('on')}/>
          :
          <Menu toggleMenu={this.toggleMenu}/>
        }
          
       {router}
     </div>
    );
  }
}

export default App;
