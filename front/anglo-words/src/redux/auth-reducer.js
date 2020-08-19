import { authAPI } from "../api/api";
import { toggleSnackbar } from "./snackbar-reducer";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "auth/SET_USER_DATA"

let initialState = {
    userId: null,
    login: null,
    image: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state; 
    }
}

export const setUserData = (userId, login, image, isAuth) => {
    return {
        type: SET_USER_DATA,
        payload: {
            userId,
            login,
            image,
            isAuth
        }
    }
}

// THUNKS
export const authMe = () => {
    return async (dispatch) => {
        let response = await authAPI.authMe();
        if(response.data.statusCode === 201){
            let user = response.data.data;
            dispatch(setUserData(user.userId, user.login, user.image, true))
        }
    }
}

export const login = (login, pass, rememberMe = false) => {
    return async (dispatch) => {
        let response = await authAPI.login(login, pass, rememberMe);
        if(response.data.statusCode === 201){
            dispatch(authMe())
            dispatch(toggleSnackbar(true, "success" ,"Авторизация прошла успешно!"))
        }else {
            let message = response.data.message.length > 0 ? response.data.message : "some error"
            dispatch(stopSubmit("login", {_error: message}))
        }
    }
}

export const registration = (login, pass) => {
    return async (dispatch) => {
        let response = await authAPI.registration(login, pass);
        if(response.data.statusCode === 201){
            await authAPI.login(login, pass, true);
            dispatch(authMe())
            dispatch(toggleSnackbar(true, "success" ,"Вы успешно зарегистрировались!"))
        }else{
            let message = response.data.message.length > 0 ? response.data.message : "some error"
            dispatch(stopSubmit("registration", {_error: message}))
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        let response = await authAPI.logout();
        if(response.data.statusCode === 201){
            dispatch(authMe())
            dispatch(setUserData(null, null, null, false))
            dispatch(toggleSnackbar(true, "info" ,"Вы успешно вышли из системы!"))
        }
    }
}


export default authReducer;