import React, {Component} from 'react';
import LoginForm from '../../components/login-form';

import {reqLogin} from '../../api/index';

import logo from './logo.png';
import './index.less';


export default class Login extends Component {
    state = {
        errMsg: ''
    }

    login = async (username, password) => {
        const result = await reqLogin(username, password);

        if (result.status === 0) {
            //登陆成功
            //保存用户信息

            //跳转页面
            this.props.history.replace('/');
        } else {
            //登陆失败，提示错误信息
            this.setState({
                    errMsg: result.msg
                }
            )
        }
    }

    render() {
        const {errMsg} = this.state;
        const height = errMsg ? 30 : 0;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目:后台管理系统</h1>
                </header>
                <section className="login-form">
                    <div className="err-message" style={{height}}>{errMsg}</div>
                    <h2>用户登录</h2>
                    <LoginForm login={this.login}/>
                </section>
            </div>
        )
    }
}