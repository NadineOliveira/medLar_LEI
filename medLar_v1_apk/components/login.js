import React, { Component } from "react";
import { ScrollView, Text, TextInput, View, Button } from "react-native";
import { connect } from "react-redux";
import axios from 'axios';

class Login extends Component {

  state = {
        username: '',
        password: '',
        token: ''
      };

  render() {
    return (
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontSize: 27 }}>Login</Text>
        <TextInput
            placeholder="Username"
            on
            onChangeText={(text) => this.setState({ username: text })}
            value={this.state.username}
        />
        <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}

        />
        <View style={{ margin: 7 }} />

        <Button
          onPress={() => {
                console.warn(this.state.username);
                console.warn(this.state.password);
                axios.post('http://localhost:8000/login', {
                    id: this.state.username,
                    password: this.state.password
                }).then(res => {
                    this.state.token = res.data.token;
                    axios.create({
                      baseURL: 'https://localhost:8000/api/',
                      timeout: 1000,
                      headers: {'authorization': 'Bearer '+res.data.token}
                    });
                    this.props.navigate.navigate("Home")

                }).catch(e => alert.show('Login Incorrect'))
            }
          }
          title="SignIn"
        />
        <View style={{ margin: 10 }} />
        <Button onPress={() => this.props.onSignOutPress} title="SignOut" />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const { login } = state;
  return { login };
};

export default connect(mapStateToProps)(Login);
