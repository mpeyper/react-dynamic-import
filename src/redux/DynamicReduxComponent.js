import React, { PropTypes } from 'react'
import { subspaced, namespaced } from 'redux-subspace'
import { DynamicComponent } from '../core'

class DynamicReduxComponent extends React.PureComponent {

    render() {
        const _this = this

        const createPromise = () => {
            return this.props.createPromise().then(result => {
                _this.context.store.injectReducer(_this.props.reducerName, namespaced(_this.props.mapReducer(result), _this.props.reducerName))
                return subspaced(state => state.root ? state.root[_this.props.reducerName] : state[_this.props.reducerName], _this.props.reducerName)(_this.props.mapComponent(result))
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