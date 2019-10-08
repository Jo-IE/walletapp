import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { FormWrapper } from '../FormWrapper';
import { Title } from '../Title';
import { AppConsumer } from '../../context'


class Login extends Component {
    constructor() {
        super()
        this.state = {

            username: '',
            password: '',
            errorMessage: [],
            usernameErrors: [],
            passwordErrors: []
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signup(this.state)
            .then(() => this.props.history.push('/dashboard'))
            .catch(err => {
                this.setState(() => {
                    return {
                        errorMessage: err.data
                    }
                })
            })
    }

    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        switch (name) {
            case "username":
                this.setState(() => {
                    return {
                        username: value
                    }
                })
                break;
            case "password":
                this.setState(() => {
                    return {
                        password: value
                    }
                })
                break;
            default:
                break;
        }
    }

    validateInput = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        const errors = [];
        if (value.length < 0) {
            errors.push('Field cannot be empty')
        }
        switch (name) {

            case "username":
                if (/[^a-zA-Z0-9]/.test(value)) {
                    errors.push('Username should only contain alphanumeric characters')
                }
                this.setState(() => {
                    return {
                        usernameErrors: errors
                    }
                })
                break;
            case "password":
                this.setState(() => {
                    return {
                        passwordErrors: errors
                    }
                })
                break;
            default:
                break;
        }
    }
    render() {
        console.log(this.props)
        return (
            <AppConsumer>
                {value => {
                    return (

                        <React.Fragment>
                            <Title className="my-5 text-center">Log in</Title>

                            <FormWrapper className="col-9 mx-auto col-md-6  my-3 my-5">
                                <div className="card py-5 px-5 ">
                                    <div className="form-group">
                                        <input type="text" name="username" className="form-control" placeholder="Username" onChange={this.handleChange} onBlur={this.validateInput} />
                                        <ul className="text-danger">{this.state.usernameErrors.map(error => {
                                            return (
                                                <li key="error">{error}</li>
                                            )
                                        })}</ul>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" className="form-control" placeholder="Password" onChange={this.handleChange} onBlur={this.validateInput} />
                                        <ul className="text-danger">{this.state.passwordErrors.map(error => {
                                            return (
                                                <li key="error">{error}</li>
                                            )
                                        })}</ul>
                                    </div>
                                    <button type="submit">Log in</button>
                                    <ul className="text-danger">
                                        {this.state.errorMessage.map(message => {
                                            return (
                                                <li key="message">{message}</li>
                                            )
                                        })}
                                    </ul>
                                    <p className="py-5">Don't have an account yet? <Link to="/signup">Sign Up!</Link></p>
                                </div>
                            </FormWrapper>
                        </React.Fragment>

                    )
                }}
            </AppConsumer>
        );
    }
}

export default Login;