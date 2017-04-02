import { createStore as baseCreateStore, combineReducers } from 'redux'

const DEFAULT_REDUCER = (state = {}) => state

export default (reducers, ...rest) => {
    const staticReducers = reducers
    let dynamicReducers = {}

    const createReducer = () => {
        let reducers = { ...staticReducers, ...dynamicReducers }
        return Object.keys(reducers).length !== 0 ? combineReducers(reducers) : DEFAULT_REDUCER
    }

    const injectReducers = (reducers) => {
        dynamicReducers = {...dynamicReducers, ...reducers}
        store.replaceReducer(createReducer())
    }

    const store = baseCreateStore(createReducer(), ...rest)

    store.injectReducers = injectReducers

    return store
}