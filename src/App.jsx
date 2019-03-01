import React, {Component} from 'react'
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';

import Login from './pages/login';
import Admin from './pages/admin';

import './assets/index.less'
export default class app extends Component {
    render(){
        return (
            <Router>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/' component={Admin}/>
                </Switch>
            </Router>
        )
    }
}