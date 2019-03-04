import React, {Component} from 'react';
import {Card, Input, Button, Icon, Form, Cascader, InputNumber,message} from 'antd';

import {reqCategories} from '../../api';
const Item = Form.Item;
class SaveUpdate extends Component {
    state={
        options:[]
    }

    //页面一开启默认请求一级分类
    componentWillMount(){
        this.getCategories('0');
    }
    //定义请求一级分类的方法
    getCategories= async (parentId)=>{
        const result=await reqCategories(parentId);
        if(result.status===0){
            //数据请求成功
            message.success('数据请求成功!');
            //判断是否有二级分类，有的话分别保存
            if(parentId==='0'){
                //说明是一级分类
                this.categories=result.data;
                this.initOptions();
            } else {
                //说明是二级分类
                this.subCategories=result.data;
            }
        } else {
            //数据请求失败
            message.error('数据请求失败！');
        }
    };
    //定义初始化options的方法
    initOptions=async ()=>{
        //首先一上来就应该显示一级分类
        let OptionsState=this.categories.map(item=>({value:item._id,label:item.name}));
        const {state}=this.props.location;

        //判断是否有二级分类，有的话在一级分类的options上追加children属性
        if(state && state.product.pCategoryId !=='0'){
            //说明有二级分类的数据，需要请求后台的二级分类数据
            await this.getCategories(state.product.pCategoryId);
                const {pCategoryId}=state.product;
                //请求数据成功
                OptionsState.map(item=>{
                    if(item.value===pCategoryId){
                        //说明请求回的二级分类数据是当前父类下的
                        item.children=this.subCategories.map(item=>({value:item._id,label:item.name}));
                    }
                    return item;
                })
            }

        this.setState({
            options:OptionsState
        })
    }


    render() {
        const {options}=this.state;
        const {location,form}=this.props;
        const {getFieldDecorator}=form;
        const {state}=location;
        const product=state?state.product:false;
        let category=[];
        if(product){
            if(product.pCategoryId==='0'){
                category.push(product.categoryId);
            } else {
                category=[product.pCategoryId,product.categoryId];
            }
        }

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 2},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        };
        return (
            <Card
                title={
                    <div>
                        <Icon type="arrow-left" style={{fontSize: 30, marginRight: 20}} onClick={()=>this.props.history.goBack()}/>
                        <span style={{fontSize: 30}}>{product?'修改商品':'添加商品'}</span>
                    </div>
                }
            >
                <Form>
                    <Item label="商品名称"   {...formItemLayout}>
                        {
                            getFieldDecorator(
                                'name',
                                {
                                    initialValue:product?product.name:''
                                }
                            )(<Input placeholder="请输入商品名称"/>)
                        }
                    </Item>
                    <Item label="商品描述"   {...formItemLayout}>
                        {
                            getFieldDecorator(
                                'desc',
                                {
                                    initialValue:product?product.desc:''
                                }
                            )(<Input placeholder="请输入商品描述"/>)
                        }
                    </Item>
                    <Item label="所选分类"   {...formItemLayout}>
                        {
                            getFieldDecorator(
                                'category',
                                {
                                    initialValue:category
                                }
                            )(<Cascader options={options} placeholder="请选择分类" style={{width: 200}}/>)
                        }

                    </Item>
                    <Item label="商品价格"   {...formItemLayout}>
                        {
                            getFieldDecorator(
                                'price',
                                {
                                    initialValue:product?product.price:''
                                }
                            )(<InputNumber placeholder="请输入商品价格" style={{width:150}} formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/>)
                        }
                    </Item>
                    <Item label="商品图"   {...formItemLayout}>
                        xxxx
                    </Item>
                    <Item label="商品详情"   {...formItemLayout}>
                        xxxx
                    </Item>
                    <Item   {...formItemLayout}>
                        <Button type="primary" htmlType="submit" style={{width:100,marginLeft:30}}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export  default Form.create()(SaveUpdate);