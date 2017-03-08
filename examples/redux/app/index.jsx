import React from 'react'
import dynamic from '../../../lib'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

export const App = () => {
    const store = createStore(s => s)

    const DynamicMessage = dynamic(() => import('../dynamicComponent'))
        .mapComponent(p => p.DynamicMessage)
        .withReducer('dynamicReducer', p => p.reducer)
    return(
        <Provider store={store}>
            <DynamicMessage message="Dynamically Loaded" />
        </Provider>
    )
}
