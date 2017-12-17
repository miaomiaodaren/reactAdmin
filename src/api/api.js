import newFetch from './fetch';
const HOST = process.env.NODE_ENV === '"development"' ? '/api' : '';
//用户登入接口测试
export const Loging = (params) => newFetch(`${HOST}/users/reginer`, params)