import { createStore as baseCreateStore, combineReducers } from 'redux'

const createReducer = (staticReducers, dynamicReducers) => {
    let reducers = { ...staticReducers, ...dynamicReducers }
    return Object.keys(reducers).length !== 0 ? combineReducers(reducers) : (state = {}) => state
}

export default (reducers, ...rest) => {
    const store = baseCreateStore(createReducer(reducers), ...rest)

    store.dynamicReducers = {}

    store.injectReducer = (name, dynamicReducer) => {
        store.dynamicReducers[name] = dynamicReducer
        store.replaceReducer(createReducer(reducers, store.dynamicReducers))
    }

    return store
}