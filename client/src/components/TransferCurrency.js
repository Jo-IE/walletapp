import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { FormWrapper } from './FormWrapper';
import { Title } from './Title';


class TransferCurrency extends Component {

    render() {
        return (
            <React.Fragment>
                <Title className="my-5 text-center">Transfer Currency</Title>

                <FormWrapper className="col-9 mx-auto col-md-6  my-3 my-5">
                    <div className="card py-5 px-5 ">

                        <div class="form-group">

                            <label for="account">Account</label>
                            <select class="form-control" name="account" >
                                <option>Bitcoin</option>
                                <option>Ethereum</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="amount">Amount to Transfer</label>
                            <input type="text" name="amount" className="form-control" placeholder="amount" />
                        </div>

                        <div className="form-group">
                            <label for="benusername">Username of Recipient</label>
                            <input type="text" name="benusername" className="form-control" />
                        </div>

                        <button type="submit">Transfer Funds</button>

                    </div>
                </FormWrapper>
            </React.Fragment>
        );
    }
}

export default TransferCurrency;