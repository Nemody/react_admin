import React, {Component} from 'react';
import {Card, Input, Button, Select, Icon,Table} from 'antd';

import MyButton from '../../components/my-button';

const Option = Select.Option;
export default class Index extends Component {

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
                width:200
            },
            {
                title: '状态',
                width:200,
                render:()=>{
                    return (
                        <div>
                            <Button>上架</Button>&nbsp;&nbsp;
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
                            <MyButton name="修改"/>
                            <MyButton name="描述"/>
                        </div>
                    )
                },
            }
        ];
    }


    render() {
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
                    dataSource={[]}
                    bordered
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '15', '20'],
                        showQuickJumper: true
                    }}
                    loading={false}
                    rowKey='_id'
                />
            </Card>
        )
    }
}