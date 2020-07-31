import actions from "redux-form/lib/actions";

const SET_MODAL = "modal/SET_MODAL";

let initialState = {
    showModal: false,
    title: "",
    description: "success",
    actions: []
}

const modalReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_MODAL: {
            return {
                ...state,
                showModal: action.showModal,
                title: action.title,
                description: action.description,
                actions: action.actions
            }
        }
        default:
            return state; 
    }
}

export const toggleModal = (showModal, {title="", description="", actions=[] }) => {
    return {
        type: SET_MODAL,
        showModal,
        title,
        description,
        actions
    }
}

/* THUNKS */

export default modalReducer;