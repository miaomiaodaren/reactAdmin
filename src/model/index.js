//redux操作思路概括
    //1.store state action render   redux共有这四部分组成
    // state 是应用的状态,一般是一个普通的对象
    // store = 是由 createStore(rootReducer)生成. 是用来管理state。包含四个函数
        // getState()  获取整个state
        // dispatch(action)  触发state的改变唯一途径
        // subscribe(listener) 可以理解成dom中的addEventListener
        // 二者的关系是 var state = store.getState();
    //action 是一个包含type属性的普通函数

import {createStore} from 'redux';
import combineReducers from './reducers';
let store = createStore(combineReducers);
export default store;

// // 打印初始状态
// console.log(store.getState());

// // 每次 state 更新时，打印日志
// // 注意 subscribe() 返回一个函数用来注销监听器
// let unsubscribe = store.subscribe(() =>
//     console.log(store.getState())
// );

// // 发起一系列 action
// store.dispatch(increment());
// store.dispatch(decrement());
// store.dispatch(reset());

// // 停止监听 state 更新
// unsubscribe();