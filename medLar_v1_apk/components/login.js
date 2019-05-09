import React, { Component } from "react";
import { AsyncStorage, ScrollView, Text, TextInput, View, Button } from "react-native";
import { connect } from "react-redux";
import axios from 'axios';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
            username: '',
            password: '',
            token: ''
          };
          this.handleChangeUser = this.handleChangeUser.bind(this)
          this.handleChangePass = this.handleChangePass.bind(this)
          this.login = this.login.bind(this)
  }

  async storeItem(key, item) {
    try {
        let json = await AsyncStorage.setItem(key, JSON.stringify(item));
        return json;
    } catch (error) {
        console.log(error.message);
    }
  }
  
  handleChangeUser(event = {}) {
    this.setState({username: event.nativeEvent.text})
  }


  handleChangePass(event = {}) {
    this.setState({password: event.nativeEvent.text})
  }


  login() {
        console.warn(this.state)

        axios.post('http://192.168.1.210:8000/login',{
                    id: this.state.username,
                    password: this.state.password
                }).then(function(res) {
                    console.warn(res.data.token);
                }).catch(function(e) {console.warn(e)})
   };



  render() {
    return (
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontSize: 27 }}>Login</Text>
        <TextInput
            id = "username"
            placeholder="Username"
            /*onChangeText={(text) => this.setState({ username: text.value })}*/
            onChange={this.handleChangeUser}
            value={this.state.username}
        />
        <TextInput
            id = "password"
            placeholder="Password"
            secureTextEntry={true}
            /*onChangeText={(text) => this.setState({ password: text.value })}*/
            onChange={this.handleChangePass}
            value={this.state.password}

        />
        <View style={{ margin: 7 }} />

        <Button
          onPress={this.login}
          title="SignIn"
        />
        <View style={{ margin: 10 }} />
        <Button onPress={() => this.props.onSignOutPress} title="SignOut" />
      </ScrollView>
    );
  }
}

export default connect()(Login);
