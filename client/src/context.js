import React, { Component } from 'react';
import axios from 'axios'

const AppContext = React.createContext()


class AppProvider extends Component {
    constructor() {
        super()
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: JSON.parse(localStorage.getItem("token")) || "",
            response: []
        }
    }

    signup = (userInfo) => {
        return axios.post('http://localhost:5000/api/users/signup', userInfo)
            .then(response => {
                console.log(response)
                const { user, token } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                this.setState(() => {
                    return {
                        user,
                        token
                    };
                });

            })
    }

    login = (userInfo) => {
        return axios.post('/api/users/login', userInfo)
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

function withContext(Component) {
    return function contextComponent(props) {
        return (
            <AppContext.Consumer>
                {context => <Component {...props} context={context} />}
            </AppContext.Consumer>
        )
    }
}

export { AppProvider, AppConsumer, withContext };