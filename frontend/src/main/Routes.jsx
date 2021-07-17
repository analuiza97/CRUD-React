import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import Home from '../components/home/Home'
import Crud from '../components/crud/Crud'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/crud' component={Crud} />
        <Redirect from='*' to='/' />
    </Switch>