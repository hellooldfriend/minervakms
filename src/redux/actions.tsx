import { IItem } from "../types"
import { GET_ITEMS, SET_ITEMS } from './types'

const URL = 'minervakms'


export const getItems = (items: IItem[]) => {
    return {
        type: GET_ITEMS,
        payload: items,
    }
}

export const setItems = (items: IItem[]) => {
    return {
        type: SET_ITEMS,
        payload: items,
    }
}

export const saveToLS = (items: IItem[]) => {
    const prepared = JSON.stringify(items)
    localStorage.setItem(URL,prepared)
}

export const loadFromLS = () => {
    const lsData = localStorage.getItem(URL)
    const data = lsData ? JSON.parse(lsData) : []
    return data
}