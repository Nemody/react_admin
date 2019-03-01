import React, {Component} from 'react';
import {Modal, Table, Button, Card, Icon, message} from 'antd';
import {reqCategories, reqAddCategories} from '../../api';
import AddCategoryForm from '../../components/add-category-form';

export default class Category extends Component {
    state = {
        categories: [],
        isShowAdd: false
    }

    componentWillMount() {
        this.columns = [{
            title: '品类名称',
            dataIndex: 'name',
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: 300,
            render: text => {
                return (
                    <div>
                        <a href="javascript:void(0)" >修改名称</a> &nbsp;&nbsp;&nbsp;
                        <a href="javascript:void(0)">查看其子品类</a>
                    </div>
                )
            },
        }];
    }

    //定义向后台发请求添加新分类进数据库的函数
    addCategory = async () => {
        //获取收集到的表单数据
        const {parentId, categoryName} = this.form.getFieldsValue();
        //将数据发送给后台添加进数据库
        const result = await reqAddCategories(parentId, categoryName)
        if (result.status === 0) {
            //数据添加成功
            message.success('添加分类成功！');
            this.setState({
                categories:[...this.state.categories,result.data],
                isShowAdd:false
            })
        } else {
            //数据添加失败
            message.error('添加分类失败！');
            this.setState({
                isShowAdd:false
            })
        }
    }


    componentDidMount = () => {
        this.getCategories('0');
    }
    //定义获取分类列表的数据的方法
    getCategories = async (parentId) => {
        const result = await reqCategories(parentId);
        if (result.status === 0) {
            //获取数据成功,在页面展示数据
            this.setState({
                categories: result.data
            })

        } else {
            //获取数据失败
            message.error('获取分类列表失败！');
        }
    }

    //定义添加分类列表的方法
    addCategories = async (parentId, categoryName) => {
        reqAddCategories(parentId, categoryName)
            .then(res => {
                //添加数据成功
                this.setState({
                    categories: [...this.state.categories, res.data]
                })
            })
            .catch(err => {
                //添加数据失败
                message.error('添加分类失败！');
            })
    }



    render() {

        const {categories, isShowAdd} = this.state;
        return (
            <div className="category">
                <Card className="show-category"
                      title="一级品类列表"
                      extra={<Button type="primary" onClick={() => {
                          this.setState({isShowAdd: true})
                      }}><Icon type="plus"/>添加品类</Button>}
                >
                    <Table
                        columns={this.columns}
                        dataSource={categories}
                        bordered
                        pagination={{
                            pageSize: 5,
                            showSizeChanger: true,
                            pageSizeOptions: ['5', '10', '15', '20'],
                            showQuickJumper: true
                        }}
                        loading={categories.length === 0}
                        rowKey='_id'
                    />
                    <Modal
                        title="添加分类"
                        visible={isShowAdd}
                        onOk={this.addCategory}
                        onCancel={()=>{this.setState({isShowAdd:false})}}
                    >
                        <AddCategoryForm categories={categories} setForm={form=>this.form=form}/>
                    </Modal>
                </Card>
            </div>

        )
    }
}