import React, {Component} from 'react';
import {Card, Input, Button, Select, Icon,Table,message} from 'antd';

import {reqProductsList} from '../../api';
import MyButton from '../../components/my-button';

const Option = Select.Option;
export default class Index extends Component {
    state={
        productsList:[],
        total:0
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
                render: () => {
                    return (
                        <div>
                            <MyButton name="详情"/>
                            <MyButton name="修改"/>
                        </div>
                    )
                },
            }
        ];
    }
    componentDidMount(){
        this.getProductsList(1,5);
    }
    //定义获取分页商品列表的方法
    getProductsList=async (pageNum,pageSize)=>{
        const result=await reqProductsList(pageNum,pageSize);
        console.log(result);
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

    render() {
        const {productsList,total}=this.state;
        return (
            <Card
                title={
                    <div>
                        <Select defaultValue="1">
                            <Option value="1">根据商品名称</Option>
                            <Option value="2">根据商品描述</Option>
                        </Select>
                        <Input placeholder="关键字" style={{width: 200, marginLeft: 10, marginRight: 10}}/>
                        <Button type="primary">搜索</Button>
                        <Button type="primary" style={{float: 'right', marginRight: 20}}><Icon
                            type="plus"/>添加产品</Button>
                    </div>
                }
            >
                <Table
                    columns={this.columns}
                    dataSource={productsList}
                    bordered
                    pagination={{
                        defaultPageSize: 5,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '15', '20'],
                        showQuickJumper: true,
                        total,
                        onChange:this.getProductsList,
                        onShowSizeChange:this.getProductsList

                    }}
                    loading={false}
                    rowKey='_id'
                />
            </Card>
        )
    }
}