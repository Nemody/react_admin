import React, {Component} from 'react';
import {Card, Input, Button, Icon, Form, Cascader, InputNumber, message} from 'antd';

import PictureWall from './picture-wall';
import RichTextEditor from './rich-text-editor';
import {reqCategories,reqUpdateProduct} from '../../api';
const Item = Form.Item;
class SaveUpdate extends Component {
    state = {
        options: []
    }

    //页面一开启默认请求一级分类
    componentWillMount() {
        this.getCategories('0');
    }

    //定义请求一级分类的方法
    getCategories = async (parentId) => {
        const result = await reqCategories(parentId);
        if (result.status === 0) {
            //数据请求成功,判断是否有二级分类，有的话分别保存
            if (parentId === '0') {
                //说明是一级分类
                this.categories = result.data;
                this.initOptions();
            } else {
                //说明是二级分类
                this.subCategories = result.data;
            }
        } else {
            //数据请求失败
            message.error('数据请求失败！');
        }
    };
    //定义初始化options的方法
    initOptions = async () => {
        //首先一上来就应该显示一级分类
        let OptionsState = this.categories.map(item => ({value: item._id, label: item.name, isLeaf: false}));
        const {state} = this.props.location;

        //判断是否有二级分类，有的话在一级分类的options上追加children属性
        if (state && state.product.pCategoryId !== '0') {
            //说明有二级分类的数据，需要请求后台的二级分类数据
            await this.getCategories(state.product.pCategoryId);
            const {pCategoryId} = state.product;
            //请求数据成功
            OptionsState.map(item => {
                if (item.value === pCategoryId) {
                    //说明请求回的二级分类数据是当前父类下的，map遍历并更改数据格式，作为当前一级分类的children属性
                    item.children = this.subCategories.map(item => ({value: item._id, label: item.name}));
                }
                //如果请求回的二级分类数据不是当前父类下的，则直接返回当前父类数据即可
                return item;
            })
        }
        //将最新的options数据渲染至页面
        this.setState({
            options: OptionsState
        })
    };
    //定义请求二级分类的方法
    loadData = async (selectedOptions) => {
        //当前选中的一级分类，拿到数组的最后一项值，去获取下一级分类的值
        //此处至于两级分类，即数组中只有一项值，因此通过一级分类查找二级分类
        const targetOption = selectedOptions[selectedOptions.length - 1];
        //将选中的一级分类设为加载中
        targetOption.loading = true;
        //调用获取分类列表的方法获取二级分类列表
        await this.getCategories(targetOption.value);
        //获取到二级分类列表之后，将一级分类状态设为停止加载
        targetOption.loading = false;
        //判断是否拿到了二级分类
        if (this.subCategories.length) {
            //有二级分类则将其追加为以及分类的children属性，并通过map遍历，将每一项值包装为指定显示的option格式数据，
            targetOption.children = this.subCategories.map(item => ({value: item._id, label: item.name}));
        } else {
            //如果当前一级分类下没有二级分类，则不需要显示箭头>
            targetOption.isLeaf = true;
        }
        //最后将最新的options数据渲染在页面
        this.setState({
            options: [...this.state.options]
        })
    };
    //定义更新商品数据的方法
    handleSubmit=async (e)=>{
        e.preventDefault();
        const {name,desc,price,category}=this.props.form.getFieldsValue();
        const detail=this.editor.getContent();
        const product={
            _id:this.props.location.state.product._id,
            name,
            desc,
            price,
            categoryId:category.length===1?category[0]:category[1],
            pCategoryId:category.length===1?'0':category[0],
            detail
        };
        const result =await reqUpdateProduct(product);
        if(result.status===0){
            //更新成功
            message.success('商品状态更新成功！');

        } else {
            message.error('商品状态更新失败！');
        }
        this.props.history.goBack();

};

    render() {
        const {options} = this.state;
        const {location, form} = this.props;
        const {getFieldDecorator} = form;
        const {state} = location;
        const product = state ? state.product : false;
        //初始化显示的分类数据  由文档可知，要显示默认的分类数据，应是一个数组
        let category = [];
        //如果product有值，则判断其是否为一级分类，若是则在category中追加product.categoryId
        //反之说明其是二级分类，保存两条数据，一条是其父类Id，一条为其自身Id
        //最终将该数组category作为分类项的默认值进行展示
        if (product) {
            if (product.pCategoryId === '0') {
                category.push(product.categoryId);
            } else {
                category = [product.pCategoryId, product.categoryId];
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
                        <Icon
                            type="arrow-left"
                            style={{fontSize: 30, marginRight: 20}}
                            onClick={() => this.props.history.goBack()}
                        />
                        <span style={{fontSize: 30}}>{product ? '修改商品' : '添加商品'}</span>
                    </div>
                }
            >
                <Form onSubmit={this.handleSubmit}>
                    <Item label="商品名称"   {...formItemLayout}>
                        {
                            getFieldDecorator(
                                'name',
                                {
                                    initialValue: product ? product.name : ''
                                }
                            )(<Input placeholder="请输入商品名称"/>)
                        }
                    </Item>
                    <Item label="商品描述"   {...formItemLayout}>
                        {
                            getFieldDecorator(
                                'desc',
                                {
                                    initialValue: product ? product.desc : ''
                                }
                            )(<Input placeholder="请输入商品描述"/>)
                        }
                    </Item>
                    <Item label="所选分类"   {...formItemLayout}>
                        {
                            getFieldDecorator(
                                'category',
                                {
                                    initialValue: category
                                }
                            )(<Cascader
                                options={options}
                                placeholder="请选择分类"
                                style={{width: 200}}
                                loadData={this.loadData}
                            />)
                        }

                    </Item>
                    <Item label="商品价格"   {...formItemLayout}>
                        {
                            getFieldDecorator(
                                'price',
                                {
                                    initialValue: product ? product.price : ''
                                }
                            )(<InputNumber placeholder="请输入商品价格" style={{width: 150}}
                                           formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/>)
                        }
                    </Item>
                    <Item label="商品图"   {...formItemLayout}>
                        <PictureWall  productId={product._id} imgs={product.imgs} />
                    </Item>
                    <Item label="商品详情"   labelCol={{span: 2}} wrapperCol={{span: 15}}>
                        <RichTextEditor detail={product?product.detail:''} ref={editor=>this.editor=editor}/>
                    </Item>
                    <Item   {...formItemLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{width: 100, marginLeft: 30}}
                        >提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export  default Form.create()(SaveUpdate);