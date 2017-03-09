import React from 'react'
import { dynamic, createStore } from '../../../lib'
import { Provider } from 'react-redux'

const store = createStore({ staticReducer: (state = false) => state }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const artificiallyDelayedPromise = () => new Promise(resolve => setTimeout(resolve, 3000)).then(() => import('../dynamicComponent'))

const DynamicMessage = dynamic(artificiallyDelayedPromise, () => <p>Loading...</p>)
    .mapComponent(p => p.DynamicMessage)
    .withReducer('dynamicReducer', p => p.dynamicReducer)

export const App = () => {
    return(
        <Provider store={store}>
            <DynamicMessage />
        </Provider>
    )
}
