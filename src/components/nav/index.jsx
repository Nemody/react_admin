import React, {Component} from 'react';
import { Menu, Icon } from 'antd';
import {NavLink,withRouter} from 'react-router-dom';
import menuList from '../../config/menuConfig';

import logo from '../../assets/images/logo.png';
import './index.less';

const {SubMenu,Item} = Menu;
class Nav extends Component {

    //定义方法对menuList进行处理，最终生成新的数组，数组中各项样式如下方注释：
    componentWillMount(){
        this.result=this.createMenu(menuList);
    }

    createMenu=(menu)=>{
        const {pathname}=this.props.location;

        return menu.map((item)=>{
            if(item.children){
                //在此对当前的路径pathname与children上的key属性做比较，若一致，则在刷新页面时选中并自动展开子菜单
                 const result =item.children.find((item)=>item.key === pathname);
                 if(result){
                     // console.log(item.key); //结果为/charts
                     this.openKey=item.key;
                     // console.log(this.openKey);//结果为/charts
                 }
                 /*if(result){
                    此处若直接将result上的值赋给this.openKey，则获取到的为二级菜单的路由地址
                    而要想实现菜单自动展开的功能，要获取到的应是一级菜单的路由地址，因此以下方法无法实现需求
                    对比上方代码可知区别之处。
                         console.log(result.key); // 结果为/charts/xxx
                         this.openKey=result.key;
                         console.log(this.openKey); //结果为charts/xxx
                 }*/
                //若有，则说明有子菜单
                  return (
                      <SubMenu key={item.key} title={<span><Icon type={item.icon} />{item.title}</span>}>
                          {
                              this.createMenu(item.children)
                          }
                      </SubMenu>
                  )
            } else {
                //若无，则说明无子菜单
                return (
                    <Item  key={item.key}>
                        <NavLink to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </NavLink>
                    </Item>
                )
            }
        })
    }



    render(){
        const {pathname}=this.props.location;

        return (
            <div className="nav">
                <header>
                    <NavLink to="/home" className="nav-header">
                        <img src={logo} alt=""/>
                        <h2>硅谷后台</h2>
                    </NavLink>
                </header>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[pathname]}
                    defaultOpenKeys={[this.openKey]}
                >
                    {
                        this.result
                    }
                </Menu>

            </div>
        )
    }
}
export default withRouter(Nav);