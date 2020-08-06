import { vocsAPI } from "../api/api";
import { toggleSnackbar } from "./snackbar-reducer";
import { toggleIsLoading } from "./preloader-reducer";
import { setVoc } from "./words-reducer";

const SET_VOCS = "voc/SET_VOCS";
const SET_VOC = "voc/SET_VOC";
const SET_CURRENT_PAGE = "voc/SET_CURRENT_PAGE";
const SET_PAGE_OPTIONS = "voc/SET_PAGE_OPTIONS";

let initialState = {
    vocs: [],
    currentPage: 1,
    pageOptions: {
        countOfVocs: 0,
        pageSize: 0
    }
}

const vocReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_VOCS: {
            return {
                ...state,
                vocs: action.vocs
            }
        }
        case SET_VOC: {
            return {
                ...state,
                vocs: state.vocs.map(voc => {
                    if(voc.id !== action.voc.id) return voc
                    else {
                        return {
                            ...voc,
                            ...action.voc
                        }
                    }
                })
            }
        }
        case SET_CURRENT_PAGE:{
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_PAGE_OPTIONS:{
            return {
                ...state,
                pageOptions: action.pageOptions
            }
        }
        default:
            return state; 
    }
}

export const setVocs = (vocs) => {
    return {
        type: SET_VOCS,
        vocs
    }
}

export const setPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}

export const setPageOptions = (pageOptions) => {
    return {
        type: SET_PAGE_OPTIONS,
        pageOptions
    }
}

/* THUNKS */
export const getVocsByUserId = (userId, page = 1) => {
    return async (dispatch) => {
        dispatch(toggleIsLoading())
        let response = await vocsAPI.getVocsByUserId(userId, page = page);
        if(response.data.statusCode === 200){
            dispatch(setPage(page))
            dispatch(setPageOptions(response.data.data.pageOptions))
            dispatch(setVocs(response.data.data.vocs))
        }
        dispatch(toggleIsLoading())
    }
}

export const addNewVoc = (title, description, isPrivate, user) => {
    return async (dispatch) => {
        let response1 = await vocsAPI.createVoc(title, description, user.userId, isPrivate ? 1 : 0);
        if(response1.data.statusCode === 200){
            dispatch(toggleSnackbar(true, "success" ,"Словарь Создан!"))
        }
    }
}

export const deleteVoc = (vocId) => {
    return async (dispatch) => {
        let response = await vocsAPI.deleteVoc(vocId);
        if(response.data.statusCode === 200 ){
            dispatch(toggleSnackbar(true, "success" ,"Словарь Удален!"))
        }
    }
}

export const updateVoc = (vocId, title, description, isPrivate, wordsCount, isSnackbar = true) => {
    return async (dispatch) => {
        let response = await vocsAPI.updateVoc(vocId, title, description, isPrivate, wordsCount);
        if(response.data.statusCode === 201){
            let voc = {
                id: vocId,
                title,
                isPrivate,
                wordsCount
            }
            dispatch(setVoc(voc));
            if(isSnackbar) dispatch(toggleSnackbar(true, "warning" ,"Словарь Обновлен!"))
        }
    }
}

export default vocReducer;