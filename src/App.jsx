import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import Login from './pages/login';
import Home from './pages/admin';

import './assets/index.less'
export default class app extends Component {
    render(){
        return (
            <Router>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/' component={Home}/>
                </Switch>
            </Router>
        )
    }
}