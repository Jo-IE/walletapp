import React, { Component } from 'react';

const AppContext = React.createContext()


class AppProvider extends Component {
    state = {}
    render() {
        return (<AppContext.Provider>
            {this.props.children}
        </AppContext.Provider>);
    }
}

const AppConsumer = AppContext.Consumer

export { AppProvider, AppConsumer };