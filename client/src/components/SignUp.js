import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { FormWrapper } from './FormWrapper';
import { Title } from './Title'


class SignUp extends Component {

    render() {
        return (
            <React.Fragment>
                <Title className="my-5 text-center">Sign up</Title>
                <FormWrapper className="col-9 mx-auto col-md-6  my-3 my-5">
                    <div className="card py-5 px-5 ">
                        <div className="form-group">
                            <input type="text" name="name" className="form-control" placeholder="Name" />
                        </div>


                        <div className="form-group">
                            <input type="text" name="username" className="form-control" placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" className="form-control" placeholder="Email Adress" />
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" className="form-control" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <input type="password" name="confirmpass" className="form-control" placeholder="Confirm Password" />
                        </div>
                        <button type="submit">Sign Up</button>
                        <p className="py-5">Already have an account? <Link to="/login">Log in!</Link></p>
                    </div>
                </FormWrapper>
            </React.Fragment>
        );
    }
}

export default SignUp;