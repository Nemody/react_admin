/*
* 此模块用于保存用户信息至localStroage
* */

import store from 'store';

const USER_KEY='user';
//保存数据
export const setItem=value=>{
    if(value && typeof value !== 'function'){
        store.set(USER_KEY,value);
    }
}
//读取数据
export const getItem=()=>{
    return store.get(USER_KEY);
}
//删除数据
export const removeItem=()=>{
    store.remove(USER_KEY);
}
