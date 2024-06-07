import { SHOW_TOAST_MODAL } from "../types"

const initialState = false

export const showToastAlert = (state = initialState, { type,  }) => {
    switch (type) {

    case SHOW_TOAST_MODAL:
        return  !state 

    default:
        return state
    }
}