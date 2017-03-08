import React, { PropTypes } from 'react'
import { subspaced } from 'redux-subspace'
import DynamicComponent from '../core'

class DynamicReduxComponent extends React.Component {

    render() {
        const _this = this

        const createPromise = () => {
            return this.props.createPromise().then(result => {
                // TODO: find a way to inject a reducer at runtime (store.replaceReducer requires knowledge of other base reducers)
                // _this.context.store.injectReducer(_this.props.mapReducer(result), _this.props.reducerName)
                return subspaced(state => state[_this.props.reducerName])(_this.props.mapComponent(result))
            })
        }

        return (
            <DynamicComponent {...this.props} createPromise={createPromise} mapComponent={c => c} mapReducer={undefined} reducerName={undefined} />
        )
    }
}

DynamicReduxComponent.contextTypes = {
    store: PropTypes.object
}

export default DynamicReduxComponent