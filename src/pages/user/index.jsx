import React, {Component} from 'react';
import {Card, Button, Table, Modal, message} from 'antd';
import dayjs from "dayjs";

import AddUserForm from './add-user-form';
import UpdateUserForm from './update-user-form';
import MyButton from '../../components/my-button';

import {reqUsersList, reqAddUser} from '../../api';

export default class User extends Component {
    state = {
        users: [], //用户数组
        isShowAddUserModal: false, //是否展示创建用户的标识
        isShowUpdateUserModal: false, //是否展示更新用户的标识
        roles: [],
        user: [] //当前选中的用户
    };

    componentWillMount() {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '电话',
                dataIndex: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: role_id => this.state.roles.find(item => item._id === role_id).name
            },
            {
                title: '操作',
                render: user => {
                    return <div>
                        <MyButton name='修改' onClick={() => {
                            this.setState({
                                isShowUpdateUserModal: true,
                                user
                            });
                            console.log(this);
                            this.handleUpdateUser();
                        }}/>
                        <MyButton name='删除' onClick={() => {
                        }}/>
                    </div>
                }
            }
        ];
    }

    componentDidMount() {
        //获取用户列表
        this.getUsersList();
    }

    //获取用户列表的方法
    getUsersList = async () => {
        const result = await reqUsersList();
        if (result.status === 0) {
            //获取成功
            message.success('获取用户列表成功！');
            this.setState({
                users: result.data.users,
                roles: result.data.roles
            })


        } else {
            //获取失败
            message.error('获取用户列表失败！');
        }
    };
    //创建用户的回调函数
    handleAddUser = () => {
        //表单验证
        this.form.validateFields(async (err, values) => {
            if (!err) {
                //表单验证通过,收集表单数据,发送请求
                const result = await reqAddUser(values);
                if (result.status === 0) {
                    message.success('添加用户成功!');
                    //在前台页面展示
                    this.setState({
                        users: [...this.state.users, result.user],
                        isShowAddUserModal: false
                    })
                } else {
                    message.error('添加用户失败！');
                }
                //更新页面
            } else {
                //表单验证未通过
                message.error('表单验证失败！');
                //若表单验证未通过，将密码重置
                this.form.resetFields('password');
            }
        });
    };
    //更新用户的回调函数
    handleUpdateUser = () => {
        //收集表单数据,判断用户是否有更改数据
        // const data=this.form.getFieldsValue();
        console.log(this);
        console.log(this.form);
    };

    //修改用户信息的方法
    updateUser = (user) => {
        this.setState({})
    }

    render() {
        const {users, isShowAddUserModal, isShowUpdateUserModal, roles, user} = this.state;
        return (
            <Card
                title={
                    <Button type='primary' onClick={() => this.setState({isShowAddUserModal: true})}>创建用户</Button>
                }
            >
                <Table
                    columns={this.columns}
                    dataSource={users}
                    bordered
                    rowKey='_id'
                    pagination={{
                        defaultPageSize: 5,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '15', '20'],
                        showQuickJumper: true,
                    }}
                />

                <Modal
                    title="创建用户"
                    visible={isShowAddUserModal}
                    onOk={this.handleAddUser}
                    onCancel={() => this.setState({isShowAddUserModal: false})}
                    okText='确认'
                    cancelText='取消'
                >
                    <AddUserForm setForm={form => this.form = form} roles={roles}/>
                </Modal>

                <Modal
                    title="更新用户"
                    visible={isShowUpdateUserModal}
                    onOk={this.handleUpdateUser}
                    onCancel={() => this.setState({isShowUpdateUserModal: false})}
                    okText='确认'
                    cancelText='取消'
                >
                    <UpdateUserForm setForm={form => {
                        console.log(this);
                        return this.form = form
                    }} user={user} roles={roles} />
                </Modal>
            </Card>
        )
    }
}
