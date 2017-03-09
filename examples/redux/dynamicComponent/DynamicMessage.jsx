import React from 'react'
import { connect } from 'react-redux'

const DynamicMessage = (props) => {
    return <p>{props.message}</p>
}

const mapStateToProps = (state) => {
    return {
        message: state.message
    }
}

export default connect(mapStateToProps)(DynamicMessage)