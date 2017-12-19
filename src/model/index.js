//redux操作思路概括
    //1.store state action render   redux共有这四部分组成
    // state 是应用的状态,一般是一个普通的对象
    // store = 是由 createStore(rootReducer)生成. 是用来管理state。包含四个函数
        // getState()  获取整个state
        // dispatch(action)  触发state的改变唯一途径
        // subscribe(listener) 可以理解成dom中的addEventListener
        // 二者的关系是 var state = store.getState();
    //action 是一个包含type属性的普通函数

import { createStore } form 'redux';

