import { createAction } from 'redux-actions';
import { createAjaxAction } from '../../util/index.js';

import { GetBlogList } from '../../api/api.js';

//blog列表数据
export const requestBlogList = createAction('request user list');
export const receiveBlogList = createAction('receive user list');
export const fetchBlogList = createAjaxAction(GetBlogList, requestBlogList, receiveBlogList);

