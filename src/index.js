import React from 'react'

class DynamicComponent extends React.Component {

    componentWillMount() {
        let _this = this
        this.props.importPromise.then(Component => {
            _this.Component = Component.default
            _this.forceUpdate()
        })
    }

    render() {
        return this.renderIfAvailable(this.Component) || this.renderIfAvailable(this.props.Loader)
    }

    renderIfAvailable(Component) {
        return Component ? <Component {...this.props } /> : null
    }
}

const dynamic = (importPromise, Loader) => props => <DynamicComponent importPromise={importPromise} Loader={Loader} {...props} />

export default dynamic