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
