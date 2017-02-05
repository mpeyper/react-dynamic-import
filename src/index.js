import React from 'react'

class DynamicComponent extends React.Component {

    componentWillMount() {
        let _this = this
        this.props.createPromise().then(Component => {
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

const dynamic = (createPromise, Loader) => props => <DynamicComponent createPromise={createPromise} Loader={Loader} {...props} />

export default dynamic