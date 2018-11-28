import { createStore } from 'redux';
import combineReducres from './reducers'
let store = createStore(combineReducres);

console.info(store, 'i am is store')

export default store;