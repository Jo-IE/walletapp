import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { FormWrapper } from '../FormWrapper';
import { Title } from '../Title'
import { withContext } from '../../context'


class SignUp extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            confirmpass: '',
            errorMessage: [],
            nameErrors: [],
            emailErrors: [],
            usernameErrors: []
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { name, username, email, password, confirmpass } = this.state;
        this.props.signup(name, username, email, password, confirmpass)
            .then(() => this.props.history.push('/dashboard'))
            .catch(err => {
                console.log(err)
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
            case "name":
                this.setState(() => {
                    return {
                        name: value
                    }
                })
                break;
            case "username":
                this.setState(() => {
                    return {
                        username: value
                    }
                })
                break;
            case "email":
                this.setState(() => {
                    return {
                        email: value
                    }
                })
                break;
            default:
                break;
        }
    }

    validateInput = (e) => {

        const { name, value } = e.target;
        const errors = [];
        if (value.length < 0) {
            errors.push('Field cannot be empty')
        }
        switch (name) {
            case "name":

                if (/[^a-zA-Z]/.test(value)) {
                    errors.push('Name should contain only letters')
                }

                this.setState(() => {
                    return {
                        nameErrors: errors
                    }
                })
                break;
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
            case "email":
                if (!/[@.]/.test(value)) {
                    errors.push('Email is in an invalid format')
                }
                this.setState(() => {
                    return {
                        emailErrors: errors
                    }
                })
                break;
            default:
                break;
        }
    }
    render() {
        console.log(this.state.name)
        console.log(this.state.nameErrors)
        console.log(this.state.errorMessage)
        console.log(this.props)
        return (

            <React.Fragment>
                <Title className="my-5 text-center">Sign up</Title>
                <FormWrapper className="col-9 mx-auto col-md-6  my-3 my-5">
                    <div className="card py-5 px-5 ">
                        <div className="form-group">
                            <input type="text" name="name" className="form-control" placeholder="Name" onChange={this.handleChange} onBlur={this.validateInput} />

                            <ul className="text-danger">{this.state.nameErrors.map(error => {
                                return (
                                    <li key="error">{error}</li>
                                )
                            })}</ul>
                        </div>

                        <div className="form-group">
                            <input type="text" name="username" className="form-control" placeholder="Username" onChange={this.handleChange} onBlur={this.validateInput} />

                            <ul className="text-danger">{this.state.usernameErrors.map(error => {
                                return (
                                    <li key="error">{error}</li>
                                )
                            })}</ul>
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" className="form-control" placeholder="Email Adress" onChange={this.handleChange} onBlur={this.validateInput} />

                            <ul className="text-danger">{this.state.emailErrors.map(error => {
                                return (
                                    <li key="error">{error}</li>
                                )
                            })}</ul>
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" className="form-control" placeholder="Password" />
                        </div>
                        <div className="form-group my-3">
                            <input type="password" name="confirmpass" className="form-control" placeholder="Confirm Password" />
                        </div>
                        <button onClick={this.props.signup} className="mt-3" type="submit">Sign Up</button>
                        <ul className="text-danger">
                            {this.state.errorMessage.map(message => {
                                return (
                                    <li key="message">{message}</li>
                                )
                            })}
                        </ul>
                        <p className="py-5">Already have an account? <Link to="/login">Log in!</Link></p>
                    </div>
                </FormWrapper>
            </React.Fragment>

        );
    }
}

export default withContext(SignUp);