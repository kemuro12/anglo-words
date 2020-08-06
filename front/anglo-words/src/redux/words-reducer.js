import { vocsAPI, wordsAPI } from "../api/api";
import { toggleSnackbar } from "./snackbar-reducer";
import { updateVoc } from "./voc-reducer";
import { toggleIsLoading } from "./preloader-reducer";

const SET_VOC = 'words/SET_VOC';
const SET_WORDS = 'words/SET_WORDS';
const ADD_WORD = 'words/ADD_WORD';
const DELETE_WORD_BY_ID = 'words/DELETE_WORD_BY_ID';
const UPDATE_WORD = 'words/UPDATE_WORD';
const SET_CURRENT_PAGE = "words/SET_CURRENT_PAGE";
const SET_PAGE_OPTIONS = "words/SET_PAGE_OPTIONS";

let initialState = {
    voc: null,
    words: [],
    currentPage : 1,
    pageOptions: {
        countOfWords: 0,
        pageSize: 0
    }
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
export const getVocById = (vocId) => {
    return async (dispatch) => {
        let response = await vocsAPI.getVocById(vocId);
        if(response.data.statusCode === 200){
            dispatch(setVoc(response.data.data))
        }
    }
}

export const getWordsByVocId = (vocId, page = 1) => {
    return async (dispatch) => {
        dispatch(toggleIsLoading())
        let response = await vocsAPI.getWordsByVocId(vocId, page = page);
        if(response.data.statusCode === 200){
            dispatch(setPage(page))
            dispatch(setPageOptions(response.data.data.pageOptions))
            dispatch(setWords(response.data.data.words))
        }
        dispatch(toggleIsLoading())
    }
}

export const addNewWord = (voc, word_eng, word_ru) => {
    return async (dispatch) => {
        dispatch(toggleIsLoading())
        let response = await wordsAPI.createWord(voc.id, word_eng, word_ru);
        if(response.data.statusCode === 200){
            dispatch(updateVoc(voc.id, voc.title, voc.description, voc.isPrivate, voc.wordsCount + 1, false))
            dispatch(toggleSnackbar(true, "success" ,"Слово Создано!"))
        }
        dispatch(toggleIsLoading())
    }
}

export const deleteWord = (voc, wordId) => {
    return async (dispatch) => {
        dispatch(toggleIsLoading())
        let response = await wordsAPI.deleteWord(wordId);
        if(response.data.statusCode === 200){
            let newVoc = {
                ...voc,
                wordsCount : voc.wordsCount - 1
            }

            dispatch(updateVoc(voc.id, voc.title, voc.description, voc.isPrivate, voc.wordsCount - 1, false))
            dispatch(setVoc(newVoc))
            dispatch(deleteWordAction(wordId))
            dispatch(toggleSnackbar(true, "success" ,"Слово Удалено!"))
        }
        dispatch(toggleIsLoading())
    }
}

export const updateWord = (wordId, word_eng, word_ru) => {
    return async (dispatch) => {
        dispatch(toggleIsLoading())
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
        dispatch(toggleIsLoading())
    }
}

export default wordsReducer;