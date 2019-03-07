import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Select } from 'antd';

// import {reqRolesList} from '../../api';
const Item = Form.Item;
const Option = Select.Option;

class AddUserForm extends Component {

  static propTypes={
      setForm:PropTypes.func.isRequired,
      roles:PropTypes.array.isRequired
  };
  componentWillMount () {
    const {setForm, form} = this.props;
    setForm(form);
  }

  render () {
    const {getFieldDecorator} = this.props.form;
    const {roles}=this.props;
    return (
      <Form>
        <Item label='用户名' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'username',
                {
                    rules:[
                        {required:true,message:'必须输入用户名'},
                        {min:4,message:'用户名不能小于4位'},
                        {max:10,message:'用户名不能超过10位'},
                        {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名只能包含字母/数字和下划线'}
                    ]
                }
            )(
              <Input placeholder='请输入用户名'/>
            )
          }
        </Item>
        <Item label='密码' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'password',
                {
                    rules:[
                        {required:true,message:'必须输入密码'},
                        {min:5,message:'用户名不能小于5位'},
                        {pattern:/^[a-zA-Z0-9_]+$/,message:'密码只能包含字母/数字和下划线'}
                    ]
                }
            )(
              <Input placeholder='请输入密码' type='password'/>
            )
          }
        </Item>
        <Item label='手机号' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'phone',
                {
                    rules:[
                        {min:6,message:'手机号不能少于6位'},
                        {pattern:/^[0-9]+$/,message:'手机号只能是数字'}
                    ]
                }
            )(
              <Input placeholder='请输入手机号'/>
            )
          }
        </Item>
        <Item label='邮箱' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'email',
                {
                    rules:[
                        {required:true,message:'必须填写一个邮箱'},
                        {pattern:/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.com$/,message:'邮箱必须是xx@xx.com的格式,xx可以是字母/数字和下划线'}
                    ]
                }
            )(
              <Input placeholder='请输入邮箱'/>
            )
          }
        </Item>
        <Item label='角色' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'role_id',
                {
                    rules:[
                        {required:true,message:'必须选择一个分类'}
                    ]
                }
            )(
              <Select placeholder='请选择分类'>
                  {
                      roles.map(item=> <Option value={item._id} key={item._id}>{item.name}</Option>)
                  }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddUserForm)