import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './components/Home/Home'
// import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import Contacts from './components/Contacts/Contacts'

export default (
    <Switch>
        <Route component={Home} path='/' exact/>
        <Route component={Profile} path='/profile'/>
        <Route component={Contacts} path='/contacts'/>
    </Switch>
)