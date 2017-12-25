import newFetch from './fetch';
// const HOST = process.env.NODE_ENV === '"development"' ? '/api' : '';
//用户登入接口测试
export const Loging = (params = {}) => newFetch(`${HOST}/users/reginer`, params);

//获取所有用户列表
export const GetUser = (params = {}) => newFetch(`${HOST}/users/GetAllUser`, params);

//添加用户
export const AddUser = (params ={}) => newFetch(`${HOST}/users/UserReginer`, params, 'POST');