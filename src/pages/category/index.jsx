import React, {Component} from 'react';
import {Modal, Table, Button, Card, Icon, message} from 'antd';
import {reqCategories, reqAddCategories, reqUpdateCategoryName} from '../../api';
import AddCategoryForm from '../../components/add-category-form';
import UpdateCategoryForm from '../../components/update-category-form' ;
import MyButton from '../../components/my-button';

export default class Category extends Component {
    state = {
        categories: [],
        isShowAdd: false,
        isShowUpdate: false,
        category: {},
        parentId: '0',
        parentName: '',
        subCategories: [],
        isSubCategoryLoading:true
    }

    componentWillMount() {
        this.columns = [{
            title: '品类名称',
            dataIndex: 'name'
        }, {
            title: '操作',
            width: 300,
            render: category => {
                if (category.parentId === '0') {
                    return (
                        <div>
                            <MyButton name="修改名称" onClick={() => this.setState(
                                {
                                    isShowUpdate: true,
                                    category: category
                                }
                            )
                            }/> &nbsp;&nbsp;&nbsp;
                            <MyButton name="查看其子品类" onClick={() => {
                                this.setState(
                                    {
                                        parentId: category._id,
                                        parentName: category.name
                                    }
                                )
                                this.getCategories(category._id);
                            }
                            }/>
                        </div>
                    )
                } else {
                    return (
                        <MyButton name="修改名称" onClick={() => this.setState(
                            {
                                isShowUpdate: true,
                                category: category
                            }
                        )
                        }/>
                    )
                }

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
                categories: [...this.state.categories, result.data],
                isShowAdd: false
            })
        } else {
            //数据添加失败
            message.error('添加分类失败！');
            this.setState({
                isShowAdd: false
            })
        }

        //清除用户输入的内容，霍夫默认值
        this.form.resetFields();
    }

    componentDidMount = () => {
        this.getCategories('0');
    }
    //定义获取分类列表的数据的方法
    getCategories = async (parentId) => {
        const result = await reqCategories(parentId);
        if (result.status === 0) {
            //获取数据成功,在页面展示数据
            if (parentId === '0') {
                this.setState({
                    categories: result.data
                })
            } else {
                if(result.data.length){
                    //说明请求的二级分类数据不为空
                    this.setState({
                        subCategories: result.data,
                        isSubCategoryLoading:true
                    })
                } else {
                    //说明请求的二级分类数据为空
                    this.setState({
                        subCategories:result.data,
                        isSubCategoryLoading:false
                    })
                }
            }
        } else {
            //获取数据失败
            message.error('获取分类列表失败！');
        }
    }

    //定义添加分类列表的方法
    addCategory= async () => {
        const {parentId, categoryName} = this.form.getFieldsValue();

        const result = await reqAddCategories(parentId, categoryName);

        let updateState={isShowAdd:false};
        if (result.status === 0) {
            //添加数据成功
            message.success('数据添加成功！');
            const currentId = this.state.parentId;
            if (parentId === '0') {
                    updateState.categories=[...this.state.categories, result.data];
            } else if (currentId === parentId){
                    updateState.subCategories = [...this.state.subCategories, result.data];
            }
        } else {
            //添加数据失败
            message.error('添加分类失败！');
        }
        //清空用户输入
        this.form.resetFields();
        //统一更新状态数据
        this.setState(updateState);

    }

    //定义修改分类名称的方法
    updateCategoryName = async () => {
        const categoryName = this.form.getFieldValue('categoryName');
        const {name, _id} = this.state.category;
        if (categoryName === name) {
            //前后名称一致，提示用户输入不一样的名称
            message.warn('不能与修改前名称一致，请重新输入！');
        } else {
            //前后名称不一致，修改后台数据及前端显示
            const result = await reqUpdateCategoryName(_id, categoryName);
            console.log(result);
            if (result.status === 0) {
                //提示用户修改成功，并修改前端显示
                message.success('分类名称修改成功！');
                this.setState({
                    categories: this.state.categories.map(item => {
                        if (item._id === _id) {
                            item.name = categoryName;
                        }
                        ;
                        //因为修改的只是其中一个分类的值，因此无论是否修改成功，都要将item返回
                        return item;
                    }),
                    isShowUpdate: false
                });
            } else {
                //提示用户修改失败
                message.error('分类名称修改失败，请稍后重试！');
                this.setState({
                    isShowUpdate: false
                });
            }
        }


    }

    render() {
        const {categories, isShowAdd, isShowUpdate, category, subCategories, parentId, parentName,isSubCategoryLoading} = this.state;
        const isCategory = parentId === '0';

        const data=isCategory?categories:subCategories;
        const isLoading=isCategory?categories.length===0:isSubCategoryLoading&&subCategories.length===0;

        return (
            <div className="category">
                <Card className="show-category"
                      title={
                          parentId === '0' ? "一级品类列表" : <div><MyButton onClick={() => {
                              this.setState({parentId: '0'})
                          }} name="一级分类"/><Icon type="arrow-right"/>&nbsp;&nbsp;{parentName}</div>
                      }
                      extra={<Button type="primary" onClick={() => {
                          this.setState({isShowAdd: true})
                      }}><Icon type="plus"/>添加品类</Button>}
                >
                    <Table
                        columns={this.columns}
                        dataSource={data}
                        bordered
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            pageSizeOptions: ['5', '10', '15', '20'],
                            showQuickJumper: true
                        }}
                        loading={isLoading}
                        rowKey='_id'
                    />
                    <Modal
                        title="添加分类"
                        visible={isShowAdd}
                        onOk={this.addCategory}
                        onCancel={() => {
                            this.setState({isShowAdd: false})
                        }}
                    >
                        <AddCategoryForm categories={categories} setForm={form => this.form = form}/>
                    </Modal>
                    <Modal
                        title="更新分类"
                        visible={isShowUpdate}
                        width={300}
                        closable={false}
                        onOk={this.updateCategoryName}
                        onCancel={() => {
                            this.setState({isShowUpdate: false})
                        }}
                    >
                        <UpdateCategoryForm categoryName={category.name} setForm={form => this.form = form}/>
                    </Modal>
                </Card>
            </div>

        )
    }
}