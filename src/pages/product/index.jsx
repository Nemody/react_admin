import React, {Component} from 'react';
import {Card, Input, Button, Select, Icon,Table,message} from 'antd';

import {reqProductsList,reqSearchProductsList} from '../../api';
import MyButton from '../../components/my-button';

const Option = Select.Option;
export default class Index extends Component {
    state={
        productsList:[],
        total:0,
        searchType:'productName',
        searchName:''
    }

    componentWillMount() {
        this.columns = [
            {
            title: '商品名称',
            dataIndex: 'name'
            },
            {
                title: '商品描述',
                dataIndex:'desc'
            },
            {
                title: '价格',
                dataIndex:'price',
                width:200,
                render:text=>'¥'+text
            },
            {
                title: '状态',
                width:200,
                render:()=>{
                    return (
                        <div>
                            <Button type="primary">上架</Button>&nbsp;&nbsp;
                            已下架
                        </div>
                    )
                }
            },
            {
                title: '操作',
                width: 200,
                render: (product) => {
                    return (
                        <div>
                            <MyButton name="详情"/>
                            <MyButton name="修改" onClick={()=>this.props.history.push('/product/saveupdate',{product})}/>
                        </div>
                    )
                },
            }
        ];
    }
    componentDidMount(){
        this.getProductsList(1,3);
    }
    //定义获取分页商品列表的方法
    getProductsList=async (pageNum,pageSize)=>{
        const {searchType,searchName}=this.state;
        let result;
        if(searchName){
            result=await reqSearchProductsList({pageNum,pageSize,searchType,searchName});
        } else {
            result=await reqProductsList(pageNum,pageSize);
        }
        if(result.status===0){
            //数据读取成功
            message.success('读取列表成功！');
            this.setState({
                productsList:result.data.list,
                total:result.data.total
            })
        } else {
            message.error('读取列表失败！')
        }
    }
    //定义收集用户输入的方法
    handleChange=(name,value)=>{
       this.setState({
           [name]:value
       })
    };

    render() {
        const {productsList,total}=this.state;
        return (
            <Card
                title={
                    <div>
                        <Select defaultValue="productName" onChange={value=>this.handleChange('searchType',value)}>
                            <Option value="productName">根据商品名称</Option>
                            <Option value="productDesc">根据商品描述</Option>
                        </Select>
                        <Input placeholder="关键字" style={{width: 200, marginLeft: 10, marginRight: 10}} onChange={e=>this.handleChange('searchName',e.target.value)}/>
                        <Button type="primary" onClick={()=>{this.getProductsList(1,3)}}>搜索</Button>
                        <Button
                            type="primary"
                            style={{float: 'right', marginRight: 20}}
                            onClick={()=>{this.props.history.push('/product/saveupdate')}}>
                            <Icon type="plus" />添加商品</Button>
                    </div>
                }
            >
                <Table
                    columns={this.columns}
                    dataSource={productsList}
                    bordered
                    pagination={{
                        defaultPageSize: 3,
                        showSizeChanger: true,
                        pageSizeOptions: ['3', '6', '9', '12'],
                        showQuickJumper: true,
                        total,
                        onChange:this.getProductsList,
                        onShowSizeChange:this.getProductsList
                     /*   defaultCurrent:1*/
                    }}
                    loading={false}
                    rowKey='_id'
                />
            </Card>
        )
    }
}