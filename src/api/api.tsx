import fetchAjax from './fetch';

//用户登入接口测试
export const Loging = (params = {}) => fetchAjax(`/users/reginer`, 'GET', params);

//获取所有用户列表
export const GetUser = (params = {}) => fetchAjax(`/user/userList`, 'GET', params);

//添加用户
export const AddUser = (params ={}) => fetchAjax(`/user/addUser`, 'POST', params);









//删除用户
export const RemoveU = (params = {}) => fetchAjax(`/users/RemoveUser`, 'POST', params);

//获取博客列表
export const GetBlogList = (params = {}) => fetchAjax(`/news/newslist`, 'POST', params);

//获取博客分类列表
export const GetBlogTypeList = (params = {}) => fetchAjax(`/types/GetTypes`, 'GET', params);

//删除博客
export const DelBlogById = (params = {}) => fetchAjax(`/news/delNews`, 'POST', params);

//添加博客分类
export const AddBlogType = (params = {}) => fetchAjax(`/types/addTypes`, 'POST', params);

//发布博客
export const AddBlog = (params = {}) => fetchAjax(`/news/addNews`, 'POST', params);

//获取小说列表
export const GetBooksList = (params = {}) => fetchAjax(`/books/showbook`, 'GET', params);

//删除小说
export const RemoveBook = (params = {}) => fetchAjax(`/books/showbook`, 'POST', params);

//增加/更新前端天堂数据
export const addLineAge = (params = {}) => fetchAjax(`/lineage/addlineage`, 'POST', params);

export const getLineAge = (params = {}) => fetchAjax(`/lineage/getlineage`, 'GET', params);