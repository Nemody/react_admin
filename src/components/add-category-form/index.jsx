import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Select ,Form,Input} from 'antd';
const Item=Form.Item;
const Option = Select.Option;
class AddCategoryForm extends Component {
    static propTypes={
        categories:PropTypes.array.isRequired,
        setForm:PropTypes.func.isRequired
    }

    componentWillMount(){
        this.props.setForm(this.props.form);
    }

    render(){
        const {getFieldDecorator} =this.props.form;
        const {categories}=this.props;
        return (
           <Form>
               <Item label="所属分类">
                   {
                       getFieldDecorator(
                           'parentId',
                           {
                               initialValue:'0'
                           }
                       )(
                           <Select defaultValue="0">
                           <Option key="0" value="0">一级分类</Option>
                               {
                                   categories.map(item=>{
                                       return <Option value={item._id} key={item._id}>{item.name}</Option>
                                   })
                               }
                       </Select>
                       )
                   }

               </Item>
               <Item label="分类名称">
                   {
                       getFieldDecorator(
                           'categoryName',
                           {}
                       )( <Input placeholder="请输入分类名称" />)
                   }

               </Item>
           </Form>
        )
    }
}

/*
 为什么要将value设置为item._id？
 在之后添加分类的操作中，倘若添加一级分类，则其parentId默认为0 .倘若要添加二级分类，
 则需要知道将要添加到哪个一级分类上去，所以需要获得二级分类的目标父类Id，因此将value
 设置为item._id，添加时即可通过getFieldsValue获取控件的value，也就是用户选中的分类Id，即为
 二级分类的目标父类Id
 */
export default Form.create()(AddCategoryForm);
