import React from 'react'
import { DynamicComponent } from './core'
import { DynamicReduxComponent } from './redux'

export default (createPromise) => {
    
    let ComponentToRender = DynamicComponent
    let LoaderComponent
    let ErrorComponent
    let mapComponent = p => p
    let reducerName
    let mapReducer

    let mapComponentCalled = false;

    const Dynamic = (props) => {
        let dynamicProps = {
            createPromise,
            LoaderComponent,
            ErrorComponent,
            mapComponent,
            reducerName,
            mapReducer
        }
        return (
            <ComponentToRender {...dynamicProps} {...props} />
        )
    }

    Dynamic.withLoaderComponent = (Component) => {
        LoaderComponent = Component
        return Dynamic
    }

    Dynamic.withErrorComponent = (Component) => {
        ErrorComponent = Component
        return Dynamic
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