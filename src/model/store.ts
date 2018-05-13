import { createStore } from 'redux';
import combineReducres from './reducers'
let store = createStore(combineReducres);

export default store;