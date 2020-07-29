const SET_USER_DATA = "auth/SET_USER_DATA"

let initialState = {
    userId: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER_DATA: {
            return {
                ...state
            }
        }
        default:
            return state; 
    }
}

export const setUserData = (userId, login, vocs, isAuth) => {
    return {
        type: SET_USER_DATA,
        payload: {
            userId,
            login,
            vocs,
            isAuth
        }
    }
}

// THUNKS
export const login = (login, pass, rememberMe) => {
    console.log(login, pass, rememberMe)
    return async (dispatch) => {
        return 20;
    }
}


export default authReducer;