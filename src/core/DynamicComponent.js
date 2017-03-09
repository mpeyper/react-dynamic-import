import React from 'react'

class DynamicComponent extends React.PureComponent {

    componentWillMount() {
        let _this = this
        this.props.createPromise().then(result => {
            _this.Component = _this.props.mapComponent(result)
            _this.forceUpdate()
        })
    }

    render() {
        return this.renderIfAvailable(this.Component) || this.renderIfAvailable(this.props.Loader)
    }

    renderIfAvailable(Component) {
        return Component ? <Component {...this.props } createPromise={undefined} mapComponent={undefined} Loader={undefined} /> : null
    }
}

export default DynamicComponent