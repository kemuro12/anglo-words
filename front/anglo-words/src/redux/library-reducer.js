import { vocsAPI, wordsAPI, ratingsAPI } from "../api/api";
import { toggleSnackbar } from "./snackbar-reducer";
import { act } from "react-dom/test-utils";
import { toggleIsLoading } from "./preloader-reducer";

const SET_ALL_VOCS = "library/SET_ALL_VOCS";
const SET_RATES = "library/SET_RATES";
const SET_RATE = "library/SET_RATE";
const SET_VOC = "library/SET_VOC";

let initialState = {
    allVocs : [],
    rates : []
}

const libraryReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_ALL_VOCS: {
            return {
                ...state,
                allVocs: action.allVocs
            }
        }
        case SET_VOC: {
            return {
                ...state,
                allVocs: state.allVocs.map(v => v.id === parseInt(action.voc.vocId) ? {...v, rate: parseFloat(action.voc.rate)} : v)
            }
        }
        case SET_RATES: {
            return {
                ...state,
                rates: [...action.rates]
            }
        }
        case SET_RATE: {
            return {
                ...state,
                rates: [ ...state.rates.filter(r => r.vocId !== parseInt(action.rate.vocId) ), { 
                    vocId: parseInt(action.rate.vocId),  
                    userId: parseInt(action.rate.userId),
                    rate: parseFloat(action.rate.rate)
                } ]
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

export const setRates = (rates) => {
    return {
        type: SET_RATES,
        rates
    }
}

export const setVoc = (voc) => {
    return {
        type: SET_VOC,
        voc
    }
}

export const setRateAC = (rate) => {
    return {
        type: SET_RATE,
        rate
    }
}

/* THUNKS */

export const getAllVocs = () => {
    return async (dispatch) => {
        dispatch(toggleIsLoading())
        let response = await vocsAPI.getVocs();
        if(response.data.statusCode === 200) {
            dispatch(setAllVocs(response.data.data.vocs))
        }
    }
}

export const copyVoc = (vocId, userId) => {
    return async (dispatch) => {
        try{
            let voc = await vocsAPI.getVocById(vocId);
            if(voc.data.statusCode === 200) voc = voc.data.data;
            
            let words = await vocsAPI.getWordsByVocId(vocId, 0);
            if(words.data.statusCode === 200) words = words.data.data.words;
        
            let responseVoc = await vocsAPI.createVoc(voc.title, voc.description, userId, 1);
            
            await wordsAPI.createWords(responseVoc.data.data.id, words);
            await vocsAPI.updateVoc(responseVoc.data.data.id, voc.title, voc.description, 1, words.length)
            
            dispatch(toggleSnackbar(true, "success" ,"Словарь Успешно Скопирован!"))
        }catch(e){
            dispatch(toggleSnackbar(true, "error" ,"Упс... Что-то пошло не так"))
        }
    }
}

export const getRates = (userId) => {
    return async (dispatch) => {
        let response = await ratingsAPI.getRates(userId);
        if(response.data.statusCode === 200) {
            dispatch(setRates(response.data.message))
        }
        dispatch(toggleIsLoading())
    }
}

export const setRate = (vocId, userId, rate) => {
    return async (dispatch) => {
        let response = await ratingsAPI.createRate(vocId, userId, rate);
        if(response.data.statusCode === 201){
            let newRate = {
                vocId,
                userId,
                rate
            }
            let newVoc = {
                vocId,
                rate: response.data.data
            }

            dispatch(setRateAC(newRate))
            dispatch(setVoc(newVoc))
            dispatch(toggleSnackbar(true, "success" ,"Оценка поставлена!"))
        }
    }
}

export default libraryReducer;