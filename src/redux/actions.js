import { GET_ITEMS, SET_ITEMS } from './types'

export const getItems = (items) => {
    return {
        type: GET_ITEMS,
        payload: items,
    }
}

export const setItems = (items) => {
    return {
        type: SET_ITEMS,
        payload: items,
    }
}
}