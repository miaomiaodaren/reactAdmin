import { createAction } from 'redux-actions';
import { createAjaxAction } from '../../util/index';

import { GetBlogList, DelBlogById, GetBlogTypeList, AddBlog } from '../../api/api';

//blog列表数据
export const requestBlogList = createAction('request blog list');
export const receiveBlogList = createAction('receive blog list');
export const fetchBlogList = createAjaxAction(GetBlogList, requestBlogList, receiveBlogList);
//删除博客数据
export const receiveBlogdel = createAction('receive blog del');
export const delfetchBlog = createAjaxAction(DelBlogById, requestBlogList, receiveBlogdel);

//获取博客分类
export const savetypelist = createAction('SAVETYPELIST');

//操作博客分类的方法
export const typelistedit = createAjaxAction(GetBlogTypeList, '', savetypelist)

//使用异步的ACTION，可以在得到数据之后保存在内存中,需要安装redux-chunk插件
export const getAsynTypeList = (data: any = {}, callback?: (data: any[]) => void) => {
    return async (dispatch: any) => {
        try{
            let { result } = await GetBlogTypeList(data);
            console.info(result, data, 'i is async')
            await dispatch({
                type: 'GETALLTYPELIST',
                list: result.res || [],
                count: result.count || 0
            });
            return Promise.resolve(result.res)
        } catch(err) {
            console.error(err);
        }
    }
}