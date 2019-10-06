import React, { Component } from 'react';
import axios from 'axios'

const AppContext = React.createContext()


class AppProvider extends Component {
    constructor() {
        super()
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: JSON.parse(localStorage.getItem("token")) || ""
        }
    }

    signup = (userInfo) => {
        return axios.post('/users/signup', userInfo)
            .then(response => {
                if (response.status === '201') {
                    const { user, token } = response.data;
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify(user));
                    this.setState(() => {
                        return {
                            user,
                            token
                        };
                    });
                }
            })
    }

    login = (userInfo) => {
        return axios.post('/users/login', userInfo)
            .then(response => {
                if (response.status === '201') {
                    const { user, token } = response.data;
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify(user));
                    this.setState(() => {
                        return {
                            user,
                            token
                        };
                    });
                }
            })
    }
    logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.setState(() => {
            return {
                user: {},
                token: ""
            }
        })
    }
    render() {
        return (<AppContext.Provider
            value={{
                ...this.state,
                signup: this.signup,
                login: this.login,
                logout: this.logout
            }}>
            {this.props.children}
        </AppContext.Provider>);
    }
}

const AppConsumer = AppContext.Consumer

export { AppProvider, AppConsumer };