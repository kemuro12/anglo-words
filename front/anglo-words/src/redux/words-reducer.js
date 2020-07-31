import { vocsAPI, wordsAPI } from "../api/api";
import { toggleSnackbar } from "./snackbar-reducer";
import { updateVoc } from "./voc-reducer";

const SET_VOC = 'words/SET_VOC';
const SET_WORDS = 'words/SET_WORDS';
const ADD_WORD = 'words/ADD_WORD';
const DELETE_WORD_BY_ID = 'words/DELETE_WORD_BY_ID';
const UPDATE_WORD = 'words/UPDATE_WORD';

let initialState = {
   voc: null,
   words: []
}

const wordsReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_VOC: {
            return {
                ...state,
                voc: action.voc
            }
        }
        case SET_WORDS: {
            return {
                ...state,
                words: action.words
            }
        }
        case ADD_WORD: {
            return {
                ...state,
                words: [...state.words, action.word]
            }
        }
        case DELETE_WORD_BY_ID: {
            return {
                ...state,
                words: state.words.filter(word => word.id !== action.wordId)
            }
        }
        case UPDATE_WORD: {
            return {
                ...state,
                words: state.words.map(word => {
                    if(word.id !== action.word.id) return word
                    else {
                        return {
                            ...word,
                            ...action.word
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

export const setWords = (words) => {
    return {
        type: SET_WORDS,
        words
    }
}

export const addWord = (word) => {
    return {
        type: ADD_WORD,
        word
    }
}

export const deleteWordAction = (wordId) => {
    return {
        type: DELETE_WORD_BY_ID,
        wordId
    }
}

export const updateWordAction = (word) => {
    return {
        type: UPDATE_WORD,
        word
    }
}

/* THUNKS */
export const getVocById = (vocId) => {
    return async (dispatch) => {
        let response = await vocsAPI.getVocById(vocId);
        if(response.data.statusCode === 200){
            dispatch(setVoc(response.data.data))
        }
    }
}

export const getWordsByVocId = (vocId) => {
    return async (dispatch) => {
        let response = await vocsAPI.getWordsByVocId(vocId);
        if(response.data.statusCode === 200){
            dispatch(setWords(response.data.data))
        }
    }
}

export const addNewWord = (voc, word_eng, word_ru) => {
    return async (dispatch) => {
        let response = await wordsAPI.createWord(voc.id, word_eng, word_ru);
        if(response.data.statusCode === 200){
            let word = {
                id: response.data.data.wordId,
                word_eng,
                word_ru
            }
            
            let newVoc = {
                ...voc,
                wordsCount : voc.wordsCount + 1
            }
            
            dispatch(updateVoc(voc.id, voc.title, voc.description, voc.isPrivate, voc.wordsCount + 1))
            dispatch(setVoc(newVoc))
            dispatch(addWord(word))
            dispatch(toggleSnackbar(true, "success" ,"Слово Создано!"))
        }
    }
}

export const deleteWord = (voc, wordId) => {
    return async (dispatch) => {
        let response = await wordsAPI.deleteWord(wordId);
        if(response.data.statusCode === 200){
            let newVoc = {
                ...voc,
                wordsCount : voc.wordsCount - 1
            }

            dispatch(updateVoc(voc.id, voc.title, voc.description, voc.isPrivate, voc.wordsCount - 1))
            dispatch(setVoc(newVoc))
            dispatch(deleteWordAction(wordId))
            dispatch(toggleSnackbar(true, "success" ,"Слово Удалено!"))
        }
    }
}

export const updateWord = (wordId, word_eng, word_ru) => {
    return async (dispatch) => {
        let response = await wordsAPI.updateWord(wordId, word_eng, word_ru);
        if(response.data.statusCode === 201){
            let word = {
                id: wordId,
                word_eng,
                word_ru
            }
            dispatch(updateWordAction(word))
            dispatch(toggleSnackbar(true, "warning" ,"Слово Обновлено!"))
        }
    }
}

export default wordsReducer;