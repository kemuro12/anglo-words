import { vocsAPI } from "../api/api";

const TOGGLE_VOC = 'games/TOGGLE_VOC';
const TOGGLE_GAMEMODE = 'games/TOGGLE_GAMEMODE';
const SET_WORDS = 'games/SET_WORDS';
const CLEAR_GAME = 'games/CLEAR_GAME';

let initialState = {
    gameModes:[
        {id:1, title:"Словарь", rules:{
            main : (w) => w,
            inputed : (w) => "",
            shuffle : (mas) => mas
        }},
        {id:2, title:"Словарь перемешанный", rules:{
            main : (w) => w,
            inputed : (w) => "",
            shuffle : (mas) => mas.sort(() => Math.random() - 0.5)
        }},
        {id:3, title:"Сплит", rules:{
            main : (w) => w,
            //удалить из слова рандомное клоичество символов
            inputed : (w) => w.substr(0, Math.floor(1 + Math.random() * ((w.length - 2) + 1 - 1))),
            shuffle : (mas) => mas.sort(() => Math.random() - 0.5)
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
                words: action.words,
                isGameStart: true
            }
        }
        case CLEAR_GAME: {
            return {
                ...state,
                selectedVocs : [],
                selectedGameMode : 1,
                words: []
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

export const clearGame = () => {
    return {
        type: CLEAR_GAME
    }
}

/* THUNKS */

export const initializeGame = ( gameMode, selectedVocs, mainLanguage ) => {
    return async (dispatch) => {
        let response = await vocsAPI.getWordsByVocsIds(selectedVocs);
        if(response.data.statusCode === 200) {
            let words = response.data.data
            if(mainLanguage === "eng"){
                words = words.map(word => ({
                    main : gameMode.rules.main(word.word_eng),
                    inputed : gameMode.rules.inputed(word.word_ru),
                    answer : word.word_ru
                }))
            }else{
                words = words.map(word => ({
                    main : gameMode.rules.main(word.word_ru),
                    inputed : gameMode.rules.inputed(word.word_eng),
                    answer : word.word_eng
                }))
            }
            
            words = gameMode.rules.shuffle(words);
            dispatch(setWords(words))
        }
    }
}

export default gamesReducer;