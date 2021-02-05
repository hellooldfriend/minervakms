import { createStore } from 'redux'
import { rootReducer } from './redux/reducers/rootReducer'
import { loadFromLS } from './redux/actions'

const savedItems = loadFromLS()

const persistedState = {
    items: savedItems
}

export const store = createStore(
    rootReducer,
    persistedState,
)