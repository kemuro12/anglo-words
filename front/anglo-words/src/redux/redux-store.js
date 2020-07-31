import { combineReducers, createStore, applyMiddleware } from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import authReducer from './auth-reducer';
import appReducer from './app-reducer';
import snackbarReducer from './snackbar-reducer';
import vocReducer from './voc-reducer';
import usersReducer from './users-reducer';
import modalReducer from './modal-reducer';
import wordsReducer from './words-reducer';

let reducers = combineReducers({
    auth: authReducer,
    app: appReducer,
    snackbar: snackbarReducer,
    modal: modalReducer,
    vocabulary: vocReducer,
    users: usersReducer,
    words: wordsReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;