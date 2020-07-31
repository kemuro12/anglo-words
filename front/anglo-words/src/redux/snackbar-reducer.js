const SET_SNACKBAR = "snackbar/SET_SNACKBAR";

/* types of snackbar
    success
    warning
    error
    info
*/

let initialState = {
    showSnackbar: false,
    snackbarMessage: "",
    snackbarType:"success"
}

const snackbarReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_SNACKBAR: {
            return {
                ...state,
                showSnackbar: action.snackbar,
                snackbarMessage: action.snackbarMessage,
                snackbarType: action.snackbarType
            }
        }
        default:
            return state; 
    }
}

export const toggleSnackbar = (snackbar, snackbarType = "success" , snackbarMessage = "") => {
    return {
        type: SET_SNACKBAR,
        snackbar,
        snackbarType,
        snackbarMessage
    }
}

/* THUNKS */

export default snackbarReducer;