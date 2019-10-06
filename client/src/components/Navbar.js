import React, { Component } from "react";
import { NavWrapper } from "./LayoutWrapper"
import { Link } from "react-router-dom";
import { AppConsumer } from '../context'


class Navbar extends Component {
    state = {};
    render() {

        return (
            <AppConsumer>
                {value => {
                    console.log(value)

                    return (


                        <NavWrapper className="navbar ">
                            <Link className="navbar-brand nav-link text-title" to="/">
                                Home
          <i className="fa fa-user-secret px-3"></i>
                            </Link>
                            {value.token === '' ?
                                <Link to='/login'>Login</Link>
                                :
                                <Link to="/" onClick={() => value.login}>Logout</Link>
                            }
                            <Link to='/signup'>Sign up</Link>
                        </NavWrapper>
                    )
                }}
            </AppConsumer>
        );
    }
}



export default Navbar;