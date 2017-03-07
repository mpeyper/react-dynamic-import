import React, { PropTypes } from 'react'
import { subspaced } from 'redux-subspace'
import DynamicComponent from '../core'

class DynamicReduxComponent extends React.Component {

    render() {
        const _this = this
        
        const createPromise = this.props.createPromise
            .then(p => {
                // TODO: find a way to inject a reducer at runtime (store.replaceReducer requires knowledge of other base reducers)
                // _this.context.store.injectReducer(_this.props.mapReducer(p.reducer), _this.props.reducerName)
                return subspaced(_this.props.mapComponent(p.Component))
            })

        return (
            <DynamicComponent {...this.props} createPromise={createPromise} />
        )
    }
}

DynamicReduxComponent.contextTypes = {
    store: PropTypes.object
}

export default DynamicReduxComponent