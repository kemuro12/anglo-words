import { combineReducers, createStore, applyMiddleware } from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import authReducer from './auth-reducer';
import appReducer from './app-reducer';
import snackbarReducer from './snackbar-reducer';
import vocReducer from './voc-reducer';
import usersReducer from './users-reducer';

let reducers = combineReducers({
    auth: authReducer,
    app: appReducer,
    snackbar: snackbarReducer,
    vocabulary: vocReducer,
    users: usersReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;