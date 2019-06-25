import React, { Component } from "react";
import {
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  Dimensions,
  ImageBackground,
  Image
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { StackActions, NavigationActions } from 'react-navigation';

const host = require("../serverAddress")
const localhost = host.host
const styles = StyleSheet.create({
  text: {
    marginTop: 5,
    marginHorizontal: 10,
    height: 30,
    width: 185,
    fontSize: 15,
    fontWeight: '200', 
    textAlignVertical: 'center'
    },
  inputBig: {
    margin: 5,
    marginHorizontal: 50,
    height: 50,
    width: 300,
    paddingHorizontal: 10,
    borderColor: '#808080',
    borderWidth: 2,
    fontSize: 20,
    fontWeight: '300', 
    borderStyle: "solid",
    borderRadius: 20,
    textAlign: 'center'
  },
  button: {
    marginTop: 10,
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    elevation: 3,
    backgroundColor: 'orange',
    borderRadius: 50
  }
})

class Login extends Component {
  static navigationOptions = {
    drawerIcon: (
    <Image 
        source={require('../assets/images/logout.png')}
        style={{ height: 24, width: 24, marginLeft: 25}}
    />
)
  };
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      token: "",
      nome: "",
      apelido: "",
      estado: "",
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
    var res = await axios.post(localhost+"/login", {	
      id: this.state.username,
      password: this.state.password
    }).catch(err=> alert(err));
    if (res.data.token != undefined) {
      this.setState({
        token: res.data.token,
        nome: res.data.nome,
        apelido: res.data.apelido,
        estado: res.data.estado
      })
      await this.storeItem('token',res.data.token);

      if(this.state.estado===0) alert("Utilizador inativo");

      if(this.state.estado===2){
        this.props.navigation.navigate("AdminScreen",{
          nome: this.state.nome,
          apelido: this.state.apelido,
          estado:this.state.estado
        });
      }
      if(this.state.estado===1){
          this.props.navigation.navigate("UtentesScreen",{
          nome: this.state.nome,
          apelido: this.state.apelido,
          estado:this.state.estado
        });
      }
    }
  }


  render() {
    return (
      <ImageBackground 
        style={{width: '100%', height: '100%'}} 
        source={require('../assets/images/loginImg.jpg')}
      >
        <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
        <Text style={{ fontSize: 27, fontWeight: "200" }}>MedLar</Text>
        <TextInput
          style={styles.inputBig}
          id="username"
          placeholder="Username"
          /*onChangeText={(text) => this.setState({ username: text.value })}*/
          onChange={this.handleChangeUser}
          value={this.state.username}
        />
        <TextInput
          style={styles.inputBig}
          id="password"
          placeholder="Password"
          secureTextEntry={true}
          /*onChangeText={(text) => this.setState({ password: text.value })}*/
          onChange={this.handleChangePass}
          value={this.state.password}
        />
        <View style={{ margin: 7 }} />

        <Button style={styles.button} color="orange" onPress={this.login} title="Iniciar Sessão" />
        </View>
      </ImageBackground>
    );
  }
}

var {height, width} = Dimensions.get('window');

export default connect()(Login);
