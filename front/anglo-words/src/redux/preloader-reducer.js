const TOGGLE_IS_LOADING = 'preloader/TOGGLE_IS_LOADING';

let initialState = {
    isLoading : false
}

const preloaderReducer = (state = initialState, action) => {
    switch(action.type){
        case TOGGLE_IS_LOADING: {
            return {
                isLoading: !state.isLoading
            }
        }
        default:
            return state; 
    }
}

export const toggleIsLoading = () => {
    return {
        type: TOGGLE_IS_LOADING 
    }
}

export default preloaderReducer;