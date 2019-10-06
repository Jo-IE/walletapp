import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { FormWrapper } from './FormWrapper';
import { Title } from './Title';


class AddAccount extends Component {

    render() {
        return (
            <React.Fragment>
                <Title className="my-5 text-center">Add an Account</Title>

                <FormWrapper className="col-9 mx-auto col-md-6  my-3 my-5">
                    <div className="card py-5 px-5 ">
                        <div className="form-group">
                            <label for="account-name">Account Name</label>
                            <input type="text" name="accountname" className="form-control" placeholder="Account name" />
                        </div>
                        <div class="form-group">

                            <label for="account-type">Account Type</label>
                            <select class="form-control" name="accounttype" >
                                <option>Bitcoin</option>
                                <option>Ethereum</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="walletid">Wallet ID</label>
                            <input type="text" name="walletid" className="form-control" placeholder="Wallet ID" />
                        </div>
                        <button type="submit">Create Account</button>

                    </div>
                </FormWrapper>
            </React.Fragment>
        );
    }
}

export default AddAccount;