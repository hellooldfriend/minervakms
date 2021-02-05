import { GET_ITEMS, SET_ITEMS } from '../types'

const initialState = {
    items: [],
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
            }
        case SET_ITEMS:
            return {
                ...state,
                items: action.payload,
            }

        default:
            return state
    }
}