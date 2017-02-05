import React from 'react'
import dynamic from '../../../lib'

export const App = () => {
    const DynamicMessage = dynamic(() => import('./DynamicMessage'))
    return <DynamicMessage />
}
