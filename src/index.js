import React from 'react'
import DynamicComponent from './core'
import DynamicReduxComponent from './redux'

const dynamic = (createPromise, Loader) => {
    
    let ComponentToRender = DynamicComponent
    let mapComponent = p => p
    let reducerName
    let mapReducer

    let mapComponentCalled = false;

    const Dynamic = (props) => {
        let dynamicProps = {
            createPromise,
            Loader,
            mapComponent,
            reducerName,
            mapReducer
        }
        return (
            <ComponentToRender {...dynamicProps} {...props} />
        )
    }

    Dynamic.mapComponent = (mapper) => {
        mapComponent = mapper
        mapComponentCalled = true
        return Dynamic
    }

    Dynamic.withReducer = (name, mapper) => {
        reducerName = name
        mapReducer = p => p.reducer
        ComponentToRender = DynamicReduxComponent

        if (mapper)
            mapReducer = mapper

        if (!mapComponentCalled)
            mapComponent = p => p.Component
        
        return Dynamic
    }

    return Dynamic
}

export default dynamic