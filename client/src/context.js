import React, { Component } from 'react';
import axios from 'axios'

const AppContext = React.createContext()

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})


class AppProvider extends Component {
    constructor() {
        super()
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: JSON.parse(localStorage.getItem("token")) || "",
            errors: []
        }
    }

    signup = (userInfo) => {
        return axios.post('http://localhost:5000/api/users/signup', userInfo)
            .then(response => {
                console.log(response)

                const { tempUser, token } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(tempUser));
                this.setState(() => {
                    return {
                        user: tempUser,
                        token
                    };
                });

            })
    }

    login = (userInfo) => {
        return axios.post('/api/users/login', userInfo)
            .then(response => {
                if (response.status === '201') {
                    const { tempUser, token } = response.data;
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify(tempUser));
                    this.setState(() => {
                        return {
                            user: tempUser,
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