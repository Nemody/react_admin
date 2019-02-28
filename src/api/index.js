/*
 * 定义发送ajax请求的函数
 *
 * */
import ajax from './ajax';


const baseUrl=process.env.NODE_ENV === 'development'? '': 'http://localhost:5000';
export const reqLogin = async (username, password) =>await  ajax(baseUrl+'/login', {username, password}, 'POST');
