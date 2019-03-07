import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Select} from 'antd';

const Item = Form.Item;
const Option = Select.Option;

class UpdateUserForm extends Component {
  static propTypes={
      user:PropTypes.object.isRequired,
      setForm:PropTypes.func.isRequired,
      roles:PropTypes.array.isRequired
  };
  componentWillMount () {
    const {setForm, form} = this.props;
    setForm(form);
  }
  render () {
    const {getFieldDecorator} = this.props.form;
    const {user,roles}=this.props;

      return (
      <Form>
        <Item label='用户名' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'name',
              {initialValue: user.username}
            )(
              <Input placeholder='请输入用户名'/>
            )
          }
        </Item>
        <Item label='手机号' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'phone',
              {initialValue: user.phone}
            )(
              <Input placeholder='请输入手机号'/>
            )
          }
        </Item>
        <Item label='邮箱' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'email',
              {initialValue: user.email}
            )(
              <Input placeholder='请输入邮箱'/>
            )
          }
        </Item>
        <Item label='角色' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'role_id',
                {initialValue:roles.find(item=>item._id===user.role_id).name}
            )(
              <Select placeholder='请选择分类'>
                  {
                      roles.map(item=><Option value={item._id} key={item._id}>{item.name}</Option>)
                  }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}
export default Form.create()(UpdateUserForm)