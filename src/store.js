import { createStore, compose, applyMiddleware } from 'redux'
import { rootReducer } from './redux/reducers/rootReducer'

export const store = createStore(
    rootReducer
)