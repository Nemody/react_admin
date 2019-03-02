import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Index from './index';
import Detail from './detail';
import SaveUpdate from './saveUpdate';

export default class Product extends Component {
    render(){
        return (
            <Switch>
                <Route path='/product/index' component={Index}/>
                <Route path='/product/detail' component={Detail}/>
                <Route path='/product/saveupdate' component={SaveUpdate}/>
                <Redirect  to='/product/index' />
            </Switch>
        )
    }
}