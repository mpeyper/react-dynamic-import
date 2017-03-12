import React from 'react'

class DynamicComponent extends React.Component {

    constructor() {
        super()
        this.state = {}
    }

    componentWillMount() {
        if (this.Component) {
            return
        }

        let _this = this
        this.props.createPromise().then(result => {
            _this.setState({Component: _this.props.mapComponent(result)})
        }).catch(e => {
            _this.setState({error: e})
        })
    }

    render() {
        return this.renderIfAvailable(this.state.Component)
            || this.renderIfAvailable(this.props.ErrorComponent, this.props.ErrorComponent && this.state.error)
            || this.renderIfAvailable(this.props.LoaderComponent)
    }

    renderIfAvailable(Component, test = Component !== undefined) {
        return test ? <Component {...this.props } error={this.error} createPromise={undefined} mapComponent={undefined} LoaderComponent={undefined} ErrorComponent={undefined} /> : null
    }
}

export default DynamicComponent