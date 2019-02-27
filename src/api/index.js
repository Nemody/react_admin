/*
 * 定义发送ajax请求的函数
 *
 * */
import ajax from './ajax';

const baseUrl='http://localhost:3000';
export const reqLogin = async (username, password) =>await  ajax(baseUrl+'/login', {username, password}, 'POST');
