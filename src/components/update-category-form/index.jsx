import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Form,Input
} from 'antd';
const Item=Form.Item;
 class UpdateCategoryForm extends Component {
     static propTypes={
         setForm:PropTypes.func.isRequired,
         categoryName:PropTypes.string.isRequired
     }

     componentWillMount(){
         this.props.setForm(this.props.form);
     }

    render(){
        const {getFieldDecorator}=this.props.form;

        const {categoryName}=this.props;
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator(
                            'categoryName',
                            {
                               initialValue:categoryName
                            }
                        )(<Input />)
                    }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(UpdateCategoryForm);