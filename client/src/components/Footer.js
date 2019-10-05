import React, { Component } from "react";
import { FooterWrapper } from "./LayoutWrapper"
import { Link } from "react-router-dom";

class Footer extends Component {
    state = {};
    render() {
        return (
            <FooterWrapper className="footer fixed-bottom">
                <p>made by moi</p>
            </FooterWrapper>
        );
    }
}



export default Footer;