import React from 'react'
import { Provider } from 'react-redux'
import { dynamic, createStore } from '../../../lib'
import Loader from './Loader'

const store = createStore({ staticReducer: (state = false) => state }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const artificiallyDelayedPromise = () => new Promise(resolve => setTimeout(resolve, 3000)).then(() => import('../dynamicComponent'))

const DynamicMessage = dynamic(artificiallyDelayedPromise)
    .mapComponent(p => p.DynamicMessage)
    .withReducer('dynamicReducer', p => p.dynamicReducer)
    .withLoaderComponent(Loader)

export const App = () => {
    return(
        <Provider store={store}>
            <DynamicMessage />
        </Provider>
    )
}
