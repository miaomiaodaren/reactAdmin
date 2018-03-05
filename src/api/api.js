import newFetch from './fetch';
// const HOST = process.env.NODE_ENV === '"development"' ? '/api' : '';
//用户登入接口测试
export const Loging = (params = {}) => newFetch(`${HOST}/users/reginer`, params);

//获取所有用户列表
export const GetUser = (params = {}) => newFetch(`${HOST}/users/GetAllUser`, params);

//添加用户
export const AddUser = (params ={}) => newFetch(`${HOST}/users/UserReginer`, params, 'POST');

//删除用户
export const RemoveU = (params = {}) => newFetch(`${HOST}/users/RemoveUser`, params, 'POST');




//获取博客列表
export const GetBlogList = (params = {}) => newFetch(`${HOST}/news/newslist`, params, 'POST');

//获取博客分类列表
export const GetBlogTypeList = (params = {}) => newFetch(`${HOST}/types/GetTypes`, params, 'GET');

//删除博客
export const DelBlogById = (params = {}) => newFetch(`${HOST}/news/delNews`, params, 'POST');

//添加博客分类
export const AddBlogType = (params = {}) => newFetch(`${HOST}/types/addTypes`, params, 'POST');

//发布博客
export const AddBlog = (params = {}) => newFetch(`${HOST}/news/addNews`, params, 'POST');

//获取小说列表
export const GetBooksList = (params = {}) => newFetch(`${HOST}/books/showbook`, params, 'GET');

//删除小说
export const RemoveBook = (params = {}) => newFetch(`${HOST}/books/showbook`, params, 'POST');


//增加/更新前端天堂数据
export const addLineAge = (params = {}) => newFetch(`${HOST}/lineage/addlineage`, params, 'POST');
export const getLineAge = (params = {}) => newFetch(`${HOST}/lineage/getlineage`, params, 'GET');