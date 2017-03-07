import React from 'react'
import dynamic from '../../../lib'

export const App = () => {
    console.log(dynamic(() => import('./DynamicMessage')))
    const DynamicMessage = dynamic(() => import('./DynamicMessage'))
        .mapComponent(p => p.default)
    return <DynamicMessage message="Dynamically Loaded" />
}
