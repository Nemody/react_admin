/*
* 该组件专用于使用button按钮代替a链接
* */
import React from 'react';
import './index.less';

export default function MyButton (props){
    return <button {...props} className="my-button">{props.name}</button>;


}