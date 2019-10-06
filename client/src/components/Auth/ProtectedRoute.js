import React, { Component } from 'react';

import { Route, Redirect } from 'react-router-dom';

import { AppConsumer } from '../../context'

function ProtectedRoute(props) {
    const { component: Component, ...rest } = props
    return (
        props.token ?
            <Route {...rest} component={Component} /> :
            <Redirect to="/login" />
    )
}

export default ProtectedRoute;