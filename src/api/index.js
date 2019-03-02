/*
 * 定义发送ajax请求的函数
 *
 * */
import jsonp from 'jsonp';

import ajax from './ajax';


const baseUrl=process.env.NODE_ENV === 'development'? '': 'http://localhost:5000';

//用户登录的请求函数
export const reqLogin = async (username, password) =>await  ajax(baseUrl+'/login', {username, password}, 'POST');
//获取天气的请求函数
export const reqWeather=(city)=>{
    return new Promise((resolve,reject)=>{
        jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,{},(err,data)=>{
            if(!err){
                //请求成功
                resolve(data.results[0].weather_data[0]);
            } else {
                //请求失败
                console.log('请求失败',err);
                reject(err);
            }
        });
    })
}
//获取分类列表的函数
export const reqCategories=parentId=> ajax(baseUrl+'/manage/category/list',{parentId},'GET');
//定义添加分类的函数
export const reqAddCategories=(parentId,categoryName)=>ajax(baseUrl+'/manage/category/add',{parentId,categoryName},'POST');
//定义修改分类名称的函数
export const reqUpdateCategoryName=(categoryId,categoryName)=>ajax(baseUrl+'/manage/category/update',{categoryId,categoryName},'POST')
//定义根据ID获取分类的方法
export const reqGetCategoryById=(categoryId)=>ajax(baseUrl+'/manage/category/info',{categoryId},'GET')
/*

http://localhost:3001/manage/category/info?categoryId=5c7894129d79013c3cd0b73a
 http://localhost:5000/manage/category/info?categoryId=5c7894129d79013c3cd0b73a
*/
