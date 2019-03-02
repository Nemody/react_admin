import React, {Component} from 'react';

import {Layout } from 'antd';

import {Route,Switch,Redirect} from 'react-router-dom';
import Nav from '../../components/nav';
import ContentHeader from '../../components/content-header';
import ContentFooter from '../../components/content-footer';
import Home from '../home'
import Category from '../category';
import Product from '../product/product';
import User from '../user';
import Role from '../role';
import Pie from '../pie';
import Line from '../line';
import Bar from '../bar';

import MemoryUtils from '../../utils/memoryUtils';

const {Content, Sider} = Layout;
export default class Admin extends Component {

    render(){
        //进行登陆验证
        const user= MemoryUtils.user;
        if(!user || !user._id){
            //如果用户没有登陆信息或者登陆信息无id，视为用户没有登陆。需要跳转到登陆页面，重新登录
            return <Redirect to="/login"/>
        }

        return (
                <Layout style={{minHeight:'100vh'}}>
                    <Sider>
                        <Nav />
                    </Sider>
                    <Layout >
                        <ContentHeader />
                        <Content style={{margin: 18}}>
                            <Switch>
                                <Route path='/home' component={Home}/>
                                <Route path='/category' component={Category}/>
                                <Route path='/product' component={Product}/>
                                <Route path='/user' component={User}/>
                                <Route path='/role' component={Role}/>
                                <Route path='/charts/pie' component={Pie}/>
                                <Route path='/charts/line' component={Line}/>
                                <Route path='/charts/bar' component={Bar}/>
                                <Redirect to="/home" />
                            </Switch>
                        </Content>
                        <ContentFooter />
                    </Layout>
                </Layout>
        )
    }
}