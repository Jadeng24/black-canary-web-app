import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './components/Home/Home'
// import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'

export default (
    <Switch>
        <Route component={Home} path='/'/>
        <Route component={Profile} path='/profile'/>
    </Switch>
)