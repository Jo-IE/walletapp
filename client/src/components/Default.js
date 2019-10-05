import React, { Component } from "react";

class Default extends Component {
    render() {
        return (
            <div>
                <h1 className=" text-title text-center my-5">404 error</h1>
                <h2 className="text-red text-title text-center my-5">
                    <span>
                        <i className="fa fa-surprise "></i>
                    </span>
                </h2>
                <h2 className="text-red text-center my-5">
                    Path {this.props.location.pathname} doesn't exist.
        </h2>
            </div>
        );
    }
}

export default Default;
