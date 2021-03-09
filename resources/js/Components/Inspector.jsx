import React from "react"
import { connect } from "react-redux"
import {login} from "../actions/authActions";

export const Inspector = (props) => {
    let { children, permissions, permission } = props;
    console.log()

    return(
        (permission in permissions) ? children : null
    )
}

const mapStateToProps = (state) => ({
    permissions: state.auth.permissions
})

export default connect(mapStateToProps,{login})(Inspector)
