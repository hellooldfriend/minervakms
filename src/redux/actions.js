import { GET_ITEMS, SET_ITEMS } from './types'
const URL = 'minervakms'

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

export const saveToLS = (items) => {
    const prepared = JSON.stringify(items)
    localStorage.setItem(URL,prepared)
}

export const loadFromLS = () => {
    const data = JSON.parse(localStorage.getItem(URL))
    return data || []
}