import React,{Component} from 'react';
import { Upload, Icon, Modal,message } from 'antd';
import PropTypes from 'prop-types';

import {reqDelImage} from '../../api';
export default class  PictureWall extends Component {
    static propTypes={
        productId:PropTypes.string.isRequired,
        imgs:PropTypes.array
    }

    state = {
        previewVisible: false, //预览图对话框，初始关闭
        previewImage: '',  //预览图的路径
        fileList: []       //文件列表
    };
    //获取要展示的图片列表
    componentWillMount(){

            const fileList=this.props.imgs?this.props.imgs.map((item,index)=>({
                uid: -index,
                name: item,
                status: 'done',
                url: 'http://localhost:5000/upload/'+item
            })):[];

            this.setState({
                fileList
            })

    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };
    //上传/删除图片的方法
    handleChange = async ({ file,fileList }) =>{
        //判断图片是否上传完成
        if(file.status==='done'){
            //图片上传完成，更新最后一个文件的名字和地址
            let lastFile=fileList[fileList.length-1];
            lastFile.name=file.response.data.name;
            lastFile.url=file.response.data.url;
        }else if (file.status==='removed'){
            //图片删除
            const result=await reqDelImage(file.name,this.props.productId);
            if(result.status===0){
                //图片删除成功
                message.success('图片删除成功！');
            } else {
                message.error('图片删除失败！');
            }
        }
        this.setState({ fileList })
    };


    render(){
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div>Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action="http://localhost:5000/manage/img/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    name="image"
                    data={{id:this.props.productId}}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}