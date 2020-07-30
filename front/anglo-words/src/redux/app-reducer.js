import { authMe } from "./auth-reducer";

const INITIALIZE_SUCCESS = 'app/INITIALIZE_SUCCESS';

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch(action.type){
        case INITIALIZE_SUCCESS:{
            return {
                ...state,
                initialized : true
            }
        }
        default:
            return state; 
    }
}

export const initializeSucces = () => {
    return {
        type: INITIALIZE_SUCCESS
    }
}

export const initializeApp = () => {
    return (dispatch) => {
        Promise.all([
            dispatch(authMe())
        ])
        .then(() => {
            dispatch(initializeSucces())
        })  
    }
}

export default appReducer;