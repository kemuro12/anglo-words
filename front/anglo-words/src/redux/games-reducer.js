import { vocsAPI } from "../api/api";

const TOGGLE_VOC = 'games/TOGGLE_VOC';
const TOGGLE_GAMEMODE = 'games/TOGGLE_GAMEMODE';
const SET_WORDS = 'games/SET_WORDS';

let initialState = {
    gameModes:[
        {id:1, title:"Словарь", rules:{
            ru : (ru) => "",
            eng : (eng) => eng,
            shuffle : (mas) => mas
        }},
        {id:2, title:"Словарь перемешанный", rules:{
            ru : (ru) => "",
            eng : (eng) => eng,
            shuffle : (mas) => mas.sort(() => Math.random() - 0.5)
        }},
        {id:3, title:"Тест 3", rules:{
            ru : (ru) => ru,
            eng : (eng) => eng,
            shuffle : (mas) => mas
        }}
    ],
    selectedVocs : [],
    selectedGameMode : 1,
    words: []
}

const gamesReducer = (state = initialState, action) => {
    switch(action.type){
        case TOGGLE_VOC:{
            return {
                ...state,
                selectedVocs: !state.selectedVocs.find( voc => voc === action.vocId ) 
                ? 
                    [...state.selectedVocs, action.vocId]
                :
                    state.selectedVocs.filter(voc => voc !== action.vocId)
            }
        }
        case TOGGLE_GAMEMODE:{
            return {
                ...state,
                selectedGameMode: action.selectedGameMode
            }
        }
        case SET_WORDS:{
            return {
                ...state,
                words: action.words
            }
        }
        default:
            return state; 
    }
}

export const toggleSelectedVoc = (vocId) => {
    return {
        type: TOGGLE_VOC,
        vocId
    }
}

export const setGameMode = (gameModeId) => {
    return {
        type: TOGGLE_GAMEMODE,
        selectedGameMode: gameModeId
    }
}

export const setWords = (words) => {
    return {
        type: SET_WORDS,
        words
    }
}

/* THUNKS */

export const initializeGame = ( gameMode, selectedVocs ) => {
    return async (dispatch) => {
        let response = await vocsAPI.getWordsByVocsIds(selectedVocs);
        if(response.data.statusCode === 200) {
            let words = response.data.data
            words = words.map(word => ({
                word_eng : word.word_eng,
                word_ru : word.word_ru,
                displayed_eng : gameMode.rules.eng(word.word_eng),
                displayed_ru : gameMode.rules.ru(word.word_ru)
            }))
            words = gameMode.rules.shuffle(words);
            dispatch(setWords(words))
        }
    }
}

export default gamesReducer;