import { createAction } from 'redux-actions';
// import { createAjaxAction } from '../../util/index.js';

import { GetBlogList, DelBlogById, GetBlogTypeList, AddBlog } from '../../api/api';

//blog列表数据
export const requestBlogList = createAction('request blog list');
export const receiveBlogList = createAction('receive blog list');
// export const fetchBlogList = createAjaxAction(GetBlogList, requestBlogList, receiveBlogList);
//删除博客数据
export const receiveBlogdel = createAction('receive blog del');
// export const delfetchBlog = createAjaxAction(DelBlogById, requestBlogList, receiveBlogdel);

//获取博客分类
export const savetypelist = createAction('SAVETYPELIST');

//操作博客分类的方法
// export const typelistedit = createAjaxAction(GetBlogTypeList, '', savetypelist)
