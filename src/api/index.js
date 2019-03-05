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
export const reqGetCategoryById=(categoryId)=>ajax(baseUrl+'/manage/category/info',{categoryId},'GET');
//定义获取分页商品列表的函数
export const reqProductsList=(pageNum,pageSize)=>ajax(baseUrl+'/manage/product/list',{pageNum,pageSize},'GET');
//定义搜索分页商品列表的函数
export const reqSearchProductsList=({pageNum,pageSize,searchType,searchName})=>ajax(baseUrl+'/manage/product/search',{pageNum,pageSize,[searchType]:searchName},'GET');
//定义删除图片的请求
export const reqDelImage=(name,pictureId)=>ajax(baseUrl+'/manage/img/delete',{name,pictureId},'POST');
//定义更新商品数据的请求
export const reqUpdateProduct=product=>ajax(baseUrl+'/manage/product/update',product,'POST');
//定义获取角色列表的请求
export const reqRolesList=()=>ajax(baseUrl+'/manage/role/list','GET');
//定义添加角色的请求
export const reqAddRole=name=>ajax(baseUrl+'/manage/role/add',{name},'POST');
//定义更新角色的请求
export const reqUpdateole=role=>ajax(baseUrl+'/manage/role/update',{role},'POST');