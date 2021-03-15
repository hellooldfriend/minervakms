import { GET_ITEMS, SET_ITEMS } from '../types'
import { IAction, IAppState } from '../../types'


const initialState: IAppState = {
    items: [],
}


export default function rootReducer(state = initialState, action: IAction) {
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