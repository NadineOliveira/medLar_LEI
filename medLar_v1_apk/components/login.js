import React, { Component } from "react";
import { ScrollView, Text, TextInput, View, Button } from "react-native";
import { connect } from "react-redux";

class Login extends Component {
  render() {
    return (
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontSize: 27 }}>Login</Text>
        <TextInput placeholder="Username" />
        <TextInput placeholder="Password" secureTextEntry={true} />
        <View style={{ margin: 7 }} />

        <Button
          onPress={() => this.props.navigation.navigate("Home")}
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
