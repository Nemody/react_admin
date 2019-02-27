import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Form, Icon, Input, Button,message
} from 'antd';



const Item=Form.Item;

class LoginForm extends Component {
    static propTypes={
        login:PropTypes.func.isRequired
    }

    //定义校验规则函数
    checkPassword=(rule,value,callback)=>{
        if(!value){
            callback('密码不能为空！');
        }else if(!(/^[a-zA-Z0-9_]+$/.test(value))){
            callback('密码只能包含英文/数字或者下划线！');
        } else if(!(value.length>=5)){
            callback('密码长度不能小于5位');
        } else {
            callback();
        }
    }
    //定义收集表单数据函数
    handleSubmit=(e)=>{
        const {validateFields,resetFields}=this.props.form;
        e.preventDefault();
        validateFields(async (error,values)=>{
            if(!error){
                //校验通过

                this.props.login(values.username,values.password);

            } else {
                //校验失败,收集错误信息并提示
                const errMsg=Object.values(error).reduce((prev,curr)=>{
                    return prev + curr.errors[0].message+'';
                },'')
                //全局提示error信息
                message.error(errMsg);
                resetFields(['password']);
            }
        })
    }

    render(){
        const {getFieldDecorator}=this.props.form;

        return (
               <Form className="login-form-container" onSubmit={this.handleSubmit}>
                   <Item>
                       {
                           getFieldDecorator(
                               'username',
                               {
                                   rules:[
                                       {required:true,message:'用户名不能为空！'},
                                       {min:4,message:'用户名长度不能小于4位！'},
                                       {max:10,message:'用户名长度不能超过10位！'},
                                       {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名只能包含英文/数字或者下划线'}
                                   ]
                               }
                           )(<Input placeholder="输入用户名" prefix={<Icon type="user" />}/>)
                       }
                   </Item>
                   <Item>
                       {
                           getFieldDecorator(
                               'password',{
                                  rules:[
                                      {validator:this.checkPassword}
                                  ]
                               }
                           )(<Input placeholder="输入密码" type="password" prefix={<Icon type="safety" />}/>)
                       }
                   </Item>
                   <Item>
                       <Button type="primary" htmlType='submit' className="login-form-btn">登录</Button>
                   </Item>
               </Form>
        )
    }
}
const WapperLoginForm=Form.create()(LoginForm);

export default WapperLoginForm;