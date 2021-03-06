import { handleActions } from 'redux-actions';

//不是特别明白这边返回三层嵌套的意思，后续研究
//(api, start, end) 这一层是在 fetchUserList方法调用的参数 但是fetchUserList其实也是一个fun,后面也有参数，是（data,cb）;
//但是他后面还有一层 dispatch
export const createAjaxAction = (api: any, startAction?: any, endAction?: any) => (data?: any, cb?: any) => (dispatch: any) => {
    let respon: any;
    startAction && dispatch(startAction(data));
    api({...data}).then((response: any): void => {
        respon = response;
        endAction && dispatch(endAction({ req: data, res: response }));
    }).then(() => {
        //如果在despatch(xx({xx:xx}), ()=> {}); 有cb的时候，会在这边执行这个cb
        cb && cb(respon)
    }).catch((err: any) => {
        console.info(err);
    }) 
}