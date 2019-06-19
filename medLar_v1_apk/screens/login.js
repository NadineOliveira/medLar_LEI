import React, { Component } from "react";
import {
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  Dimensions 
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      token: ""
    };
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.login = this.login.bind(this);
  }

  async storeItem(key, item) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(item));
      let value = await AsyncStorage.getItem('token');
      //console.warn("ITEM: "+value)
      return value;
    } catch (error) {
      console.log(error.message);
    }
  }

  handleChangeUser(event = {}) {
    this.setState({ username: event.nativeEvent.text });
  }

  handleChangePass(event = {}) {
    this.setState({ password: event.nativeEvent.text });
  }

  async login() {
    var res = await axios.post("http://192.168.2.94:8000/login", {	
      id: this.state.username,
      password: this.state.password
    }).catch(err=> alert(err));
    if (res.data.token != undefined) {
      this.setState({
        token: res.data.token
      })
      await this.storeItem('token',res.data.token);
      console.warn("Token:" + res.data.token);
      console.warn("inToken:" + this.state.token);
      this.props.navigation.navigate("UtentesDashNavigator");
    }
  }


  render() {
    return (
      <ScrollView>
        <Text style={{ fontSize: 27 }}>Login</Text>
        <TextInput
          id="username"
          placeholder="Username"
          /*onChangeText={(text) => this.setState({ username: text.value })}*/
          onChange={this.handleChangeUser}
          value={this.state.username}
        />
        <TextInput
          id="password"
          placeholder="Password"
          secureTextEntry={true}
          /*onChangeText={(text) => this.setState({ password: text.value })}*/
          onChange={this.handleChangePass}
          value={this.state.password}
        />
        <View style={{ margin: 7 }} />

        <Button style={style.button} onPress={this.login} title="SignIn" />
      </ScrollView>
    );
  }
}


var style = StyleSheet.create({
  button: {
    
  }
});

var {height, width} = Dimensions.get('window');

export default connect()(Login);
