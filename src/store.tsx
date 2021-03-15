import { createStore } from 'redux'
import rootReducer from './redux/reducers/rootReducer'
import { loadFromLS } from './redux/actions'
import { IAppState } from './types'

const savedItems = loadFromLS()

const persistedState: IAppState = {
    items: savedItems
}

const store = createStore(
    rootReducer,
    persistedState,
)

export default store