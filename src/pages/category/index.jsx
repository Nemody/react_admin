import React, {Component} from 'react';
import { Row,Col,Table,Button,Card ,Icon} from 'antd';

export default class Category extends Component {
    render(){
        const columns = [{
            title: '品类名称',
            dataIndex: 'name',
        }, {
            title: '操作',
            dataIndex: 'money',
            width:300 ,
            render: text =>{
                return (
                    <div>
                        <a href="javascript:void(0)">修改名称</a> &nbsp;&nbsp;&nbsp;
                        <a href="javascript:void(0)">查看其子品类</a>
                    </div>
                )
            },
        }];

        const data = [{
            key: '1',
            name: '111'
        }, {
            key: '2',
            name: '222'
        }, {
            key: '3',
            name: '333'
        }, {
            key: '4',
            name: '444'
        }, {
            key: '5',
            name: '555'
        }, {
            key: '6',
            name: '666'
        }, {
            key: '7',
            name: '777'
        }, {
            key: '8',
            name: '888'
        }, {
            key: '9',
            name: '999'
        }];



        return (
                <Card
                    title="一级品类列表"
                    extra={<Button type="primary"><Icon type="plus" />添加品类</Button>}
                >
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        pagination={{
                            pageSize: 3,
                            showSizeChanger: true,
                            pageSizeOptions: ['3', '6', '9', '12'],
                            showQuickJumper: true
                        }}
                    />
                </Card>
        )
    }
}