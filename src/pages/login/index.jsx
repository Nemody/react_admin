import React, {Component} from 'react';
import LoginForm from '../../components/login-form';

import logo from './logo.png';
import './index.less';


export default class Login extends Component {
    //当收集到数据没有错误信息时，说明用户名和密码通过校验
    //此时向服务器发送请求，验证用户名和密码是否正确，完成登录功能

    login=(username,password)=>{
        console.log('发送异步的ajax请求',username,password);
    }

    render(){
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目:后台管理系统</h1>
                </header>
                <section className="login-form">
                    <h2>用户登录</h2>
                    <LoginForm  login={this.login}/>
                </section>
            </div>
        )
    }
}