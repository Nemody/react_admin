import React, {Component} from 'react';
import {Row, Col, Modal,message} from 'antd';
import {withRouter} from 'react-router-dom';
import dayjs from 'dayjs';

import './index.less';
import MemoryUtils from '../../utils/memoryUtils';
import {removeItem} from '../../utils/storageUtils';
import menuList from '../../config/menuConfig';
import {reqWeather} from '../../api';
import MyButton from '../../components/my-button';

class ContentHeader extends Component {

    state={
        sysTimer:dayjs().format('YYYY-MM-DD HH:mm:ss'),
        dayPictureUrl:'http://api.map.baidu.com/images/weather/day/qing.png',
        weather:'阴转多云'
    }

    componentDidMount(){
        this.updateTime();
        this.getWeather('北京');
    }

    componentWiiUpmount(){
        clearInterval(this.intervalId);
    }

    //定义退出登录的事件处理函数
    logOut = () => {
        //用户点击退出登录
        Modal.confirm({
            title: '您确认要退出登录吗?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                //用户确认退出登录
                //清除localStroage和MemoryUtils中保存的用户信息
                removeItem();
                MemoryUtils.user = {};
                //跳转至登陆页面
                this.props.history.replace('/login');
            }
        });
    }

    //定义获取当前菜单项的函数
    getTitle = (menu) => {
       let {pathname} = this.props.location;
        if(/^\/product/.test(pathname)){
            pathname='/product';
        }
        for (let i = 0; i < menu.length; i++) {
            const item = menu[i];
            if (item.children) {
                //有子菜单项，递归调用该方法，对子菜单进行遍历判断
                const result=this.getTitle(item.children);
                //遍历的结果可能没有值，所以应当判断下返回值，有值则输出才有意义
                if(result){
                    return result;
                }
            } else {
                //没有子菜单项，直接返回对象下的title属性值
                if (item.key === pathname) {
                    return item.title;
                }
            }
        }
    }

    //定义获取时间的函数
    updateTime=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({
                sysTimer:dayjs().format('YYYY-MM-DD HH:mm:ss')
            })
        },1000)
    }

    //定义获取天气的函数
    getWeather=(city)=>{
        reqWeather(city)
            .then(res=>{
                //获取数据成功
                this.setState({
                    dayPictureUrl:res.dayPictureUrl,
                    weather:res.weather
                })
            })
            .catch(err=>{
                //获取数据失败
                message.error('网络不稳定，请稍后重试');
            })

    }

    render() {
        const {username} = MemoryUtils.user;
        const title=this.getTitle(menuList);
        const {sysTimer,dayPictureUrl,weather}=this.state;
        return (
            <div className="content-header">
                <Row className="content-header-top">
                    <span>欢迎，{username}</span>
                    <MyButton  onClick={this.logOut} name="退出" />
                </Row>
                <Row className="content-header-bottom">
                    <Col span={6} className="left">{title}</Col>
                    <Col span={18} className="right">
                        <span>{sysTimer}</span>
                        <img src={dayPictureUrl} alt="weatherPic"/>
                        <span>{weather}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(ContentHeader);