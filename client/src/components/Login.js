import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { FormWrapper } from './FormWrapper';
import { Title } from './Title';
import { AppConsumer } from '../context'


class Login extends Component {
    handleSumbit = (e) => {
        e.preventDefault();
        this.props.signup(this.state)
            .then(() => this.props.history.push('/dashboard'))
    }
    render() {
        return (
            <AppConsumer>
                {value => {
                    return (

                        <React.Fragment>
                            <Title className="my-5 text-center">Log in</Title>

                            <FormWrapper className="col-9 mx-auto col-md-6  my-3 my-5">
                                <div className="card py-5 px-5 ">
                                    <div className="form-group">
                                        <input type="text" name="username" className="form-control" placeholder="Username" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" className="form-control" placeholder="Password" />
                                    </div>
                                    <button type="submit">Log in</button>
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