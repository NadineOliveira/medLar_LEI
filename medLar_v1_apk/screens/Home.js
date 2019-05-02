import React, {Component} from 'react';
import{
    AppRegistry
} from 'react-native';

import {Login} from '../components/login';

class HomeLogin extends Component{
    state = {
        isLoggedIn: false
    }

    render(){
        return <Login
                onLoginPress={() => this.setState({isLoggedIn: true})}
                />;
    }
}

AppRegistry.registerComponent(HomeLogin, () => HomeLogin);