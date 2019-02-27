import React, {Component} from 'react';

export default class MenuList extends Component {
    render(){
        return (
            <div>
                <Item  key="/home">
                    <NavLink to="/home">
                        <Icon type="home" />
                        <span>首页</span>
                    </NavLink>
                </Item>
                <SubMenu key="/products" title={<span><Icon type="appstore" />商品</span>}>
                    <Item  key="/category">
                        <NavLink to="/category">
                            <Icon type="bars" />
                            <span>品类管理</span>
                        </NavLink>
                    </Item>
                    <Item key="/product">
                        <NavLink to="/product">
                            <Icon type="tool" />
                            <span>商品管理</span>
                        </NavLink>
                    </Item>
                </SubMenu>
                <Item key="/user">
                    <NavLink to="/user">
                        <Icon type="user" />
                        <span>用户管理</span>
                    </NavLink>
                </Item>
                <Item key="/role">
                    <NavLink to="/role">
                        <Icon type="safety" />
                        <span>权限管理</span>
                    </NavLink>
                </Item>
                <SubMenu key="/charts" title={<span><Icon type="area-chart" />图形图表</span>}>
                    <Item key="/charts/bar">
                        <NavLink to="/charts/bar">
                            <Icon type="bar-chart" />
                            <span>柱形图</span>
                        </NavLink>
                    </Item>
                    <Item key="/charts/line">
                        <NavLink to="/charts/line">
                            <Icon type="line-chart" />
                            <span>折线图</span>
                        </NavLink>
                    </Item>
                    <Item key="/charts/pie">
                        <NavLink to="/charts/pie">
                            <Icon type="pie-chart" />
                            <span>饼图</span>
                        </NavLink>
                    </Item>
                </SubMenu>
            </div>
        )
    }
}