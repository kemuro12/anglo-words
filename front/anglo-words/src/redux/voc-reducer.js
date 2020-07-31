import { vocsAPI } from "../api/api";
import { authMe } from "./auth-reducer";
import { toggleSnackbar } from "./snackbar-reducer";

const SET_VOCS = "voc/SET_VOCS";
const SET_VOC = "voc/SET_VOC";

let initialState = {
   vocs: []
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
        default:
            return state; 
    }
}

export const setVoc = (voc) => {
    return {
        type: SET_VOC,
        voc
    }
}

export const setVocs = (vocs) => {
    return {
        type: SET_VOCS,
        vocs
    }
}

/* THUNKS */
export const getVocsByUserId = (userId) => {
    return async (dispatch) => {
        let response = await vocsAPI.getVocsByUserId(userId);
        if(response.data.statusCode === 200){
            dispatch(setVocs(response.data.data));
        }
    }
}

export const addNewVoc = (title, description, isPrivate, user) => {
    return async (dispatch) => {
        let response1 = await vocsAPI.createVoc(title, description, user.userId, isPrivate ? 1 : 0);
        if(response1.data.statusCode === 200){
            dispatch(toggleSnackbar(true, "success" ,"Словарь Создан!"))
            dispatch(authMe())
        }
    }
}

export const deleteVoc = (vocId) => {
    return async (dispatch) => {
        let response = await vocsAPI.deleteVoc(vocId);
        if(response.data.statusCode === 200 ){
            dispatch(toggleSnackbar(true, "success" ,"Словарь Удален!"))
            dispatch(authMe())
        }
    }
}

export const updateVoc = (vocId, title, description, isPrivate, wordsCount) => {
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
            dispatch(toggleSnackbar(true, "warning" ,"Словарь Обновлен!"))
        }
    }
}

export default vocReducer;