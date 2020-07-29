import { combineReducers, createStore, applyMiddleware } from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import authReducer from './auth-reducer';


let reducers = combineReducers({
    auth: authReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;