import { vocsAPI, wordsAPI } from "../api/api";

const SET_ALL_VOCS = "library/SET_ALL_VOCS";

let initialState = {
    allVocs : []
}

const libraryReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_ALL_VOCS: {
            return {
                ...state,
                allVocs: action.allVocs
            }
        }
        default:
            return state; 
    }
}

export const setAllVocs = (vocs) => {
    return {
        type: SET_ALL_VOCS,
        allVocs: vocs
    }
}

/* THUNKS */

export const getAllVocs = () => {
    return async (dispatch) => {
        let response = await vocsAPI.getVocs();
        if(response.data.statusCode === 200) {
            dispatch(setAllVocs(response.data.data.vocs))
        }
    }
}

export const copyVoc = (vocId, userId) => {
    return async (dispatch) => {
        let voc = await vocsAPI.getVocById(vocId);
        if(voc.data.statusCode === 200) voc = voc.data.data;

        let words = await vocsAPI.getWordsByVocId(vocId, 0);
        if(words.data.statusCode === 200) words = words.data.data.words;

        let responseVoc = await vocsAPI.createVoc(voc.title, voc.description, userId, 1);
        
        await wordsAPI.createWords(responseVoc.data.data.id, words);
        await vocsAPI.updateVoc(responseVoc.data.data.id, voc.title, voc.description, 1, words.length)
    }
}

export default libraryReducer;