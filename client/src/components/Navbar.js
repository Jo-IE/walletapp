import React, { Component } from "react";
import { NavWrapper } from "./LayoutWrapper"
import { Link } from "react-router-dom";

class Navbar extends Component {
    state = {};
    render() {
        return (
            <NavWrapper className="navbar ">
                <Link className="navbar-brand nav-link text-title" to="/">
                    Home
          <i className="fa fa-user-secret px-3"></i>
                </Link>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Sign up</Link>
            </NavWrapper>
        );
    }
}



export default Navbar;