import React, {Component} from 'react';
import {Card, Button, Table, Radio, Modal, message} from 'antd';
import {reqRolesList, reqAddRole,reqUpdateRole} from '../../api';
import dayjs from 'dayjs';

import AddRoleForm from './add-role-form';
import UpdateRoleForm from './update-role-form';
import MemoryUtils from '../../utils/memoryUtils';
const RadioGroup = Radio.Group;

export default class Role extends Component {
    state = {
        value: '',  //单选的默认值，也就是选中的某个角色的id值
        roles: [], //权限数组
        isShowAddRoleModal: false, //是否展示创建角色的标识
        isShowUpdateRoleModal: false, //是否展示设置角色的标识
        isDisabled: true,
        role:{}
    };
    componentWillMount() {
        this.columns = [{
            dataIndex: '_id',
            render: id => <Radio value={id}/>
        }, {
            title: '角色名称',
            dataIndex: 'name',
        }, {
            title: '创建时间',
            dataIndex: 'create_time',
            render: time => {
                return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
            }
        }, {
            title: '授权时间',
            dataIndex: 'auth_time',
            render: time => {
                return time && dayjs(time).format('YYYY-MM-DD HH:mm:ss');
            }
        }, {
            title: '授权人',
            dataIndex: 'auth_name',
        }];
    }
    componentDidMount() {
        //获取角色列表
        this.getRolesList();
    }
    getRolesList = async () => {
        const result = await reqRolesList();
        if (result.status === 0) {
            message.success('角色列表获取成功！', .5);
            this.setState({
                roles: result.data
            })
        } else {
            message.error('角色列表获取失败！', .5);
        }
    };
    onRadioChange = (e) => {
        const result=this.state.roles.find(item=>item._id===e.target.value);
        this.setState({
            isDisabled:false,
            value: e.target.value,
            role:result
        });
    };
    isShowModal = (name, flag) => {
        this.setState({[name]: flag})
    };
    //创建角色的回调函数
    handleAddRole = async () => {
        //收集用户输入的数据
        const name = this.form.getFieldValue('name');
        // 将数据发送给后台服务器
        if (name) {
            const result = await reqAddRole(name);
            if (result.status === 0) {
                message.success('角色创建成功！', .5);
                //更新前台页面，并隐藏对话框
                this.setState({
                    roles: [...this.state.roles, result.data],
                    isShowAddRoleModal: false
                })
            } else {
                message.error('角色创建失败！', .5);
                this.setState({
                    isShowAddRoleModal: false
                })
            }
        }
    };
    //定义更新角色的方法
    updateMenus=(menus)=>{
        this.setState({
            role:{...this.state.role,menus}
        })
    };
    //设置角色权限的回调函数
    handleUpdateRole = async () => {
        //收集最新的role数据--updateMenus中已是最新数据
        const {role}=this.state;
        role.auth_name=MemoryUtils.user.username;
        role.auth_time=Date.now();

        //发送请求更新后台数据
        const result=await reqUpdateRole(role);
        if(result.status===0){
            message.success('更新角色成功！');
            this.setState({
                roles:this.state.roles.map(item=>{
                    if(item._id===role._id){
                        return role;
                    }else {
                        return item;
                    }
                }),
                isShowUpdateRoleModal:false
            })
        } else {
            message.error('更新角色失败！');
        }
        //更新前台数据
    };

    render() {
        const {roles, value, role,isDisabled, isShowAddRoleModal, isShowUpdateRoleModal} = this.state;
        return (
            <Card
                title={
                    <div>
                        <Button type='primary'
                                onClick={() => this.isShowModal('isShowAddRoleModal', true)}>创建角色</Button> &nbsp;&nbsp;
                        <Button type='primary' disabled={isDisabled}
                                onClick={() => this.isShowModal('isShowUpdateRoleModal', true)}>设置角色权限</Button>
                    </div>
                }
            >
                <RadioGroup onChange={this.onRadioChange} value={value} style={{width: '100%'}}>
                    <Table
                        columns={this.columns}
                        dataSource={roles}
                        bordered
                        rowKey='_id'
                        pagination={{
                            defaultPageSize: 5,
                            showSizeChanger: true,
                            pageSizeOptions: ['5', '10', '15', '20'],
                            showQuickJumper: true,
                        }}
                    />
                </RadioGroup>
                <Modal
                    title="创建角色"
                    visible={isShowAddRoleModal}
                    onOk={this.handleAddRole}
                    onCancel={() => this.isShowModal('isShowAddRoleModal', false)}
                    okText='确认'
                    cancelText='取消'
                >
                    <AddRoleForm setForm={form => this.form = form}/>
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={isShowUpdateRoleModal}
                    onOk={this.handleUpdateRole}
                    onCancel={() => this.isShowModal('isShowUpdateRoleModal', false)}
                    okText='确认'
                    cancelText='取消'
                >
                    <UpdateRoleForm setForm={form => this.form = form} name={role.name} menus={role.menus} updateMenus={this.updateMenus}/>
                </Modal>
            </Card>
        )
    }
}
