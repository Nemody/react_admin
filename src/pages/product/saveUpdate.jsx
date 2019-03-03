import React, {Component} from 'react';
import {Card, Input, Button, Icon, Form, Cascader, InputNumber} from 'antd';
const Item = Form.Item;
const InputGroup = Input.Group;
export default class SaveUpdate extends Component {
    render() {
        const options = [{
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [{
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [{
                    value: 'xihu',
                    label: 'West Lake',
                }],
            }],
        }, {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [{
                value: 'nanjing',
                label: 'Nanjing',
                children: [{
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                }],
            }],
        }];

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 2},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        return (
            <Card
                title={
                    <div>
                        <Icon type="arrow-left" style={{fontSize: 30, marginRight: 20}}/>
                        <span style={{fontSize: 30}}>添加商品</span>
                    </div>
                }
            >
                <Form>
                    <Item label="商品名称"   {...formItemLayout}>
                        <Input placeholder="请输入商品名称"/>
                    </Item>
                    <Item label="商品描述"   {...formItemLayout}>
                        <Input placeholder="请输入商品描述"/>
                    </Item>
                    <Item label="所选分类"   {...formItemLayout}>
                        <Cascader options={options} placeholder="请选择分类" style={{width: 150}}/>
                    </Item>
                    <Item label="商品价格"   {...formItemLayout}>
                        <InputGroup>
                            <InputNumber placeholder="请输入商品价格" style={{width:150,position: 'relative', zIndex: 10}}/>
                            <Input style={{width: 0, position: 'absolute', left: 125, top: 0.3}} addonAfter={'元'}/>
                        </InputGroup>
                    </Item>
                    <Item label="商品图"   {...formItemLayout}>
                        xxxx
                    </Item>
                    <Item label="商品详情"   {...formItemLayout}>
                        xxxx
                    </Item>
                    <Item   {...formItemLayout}>
                        <Button type="primary" htmlType="submit" style={{width:100}}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}