import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ListView,
  FlatList,
  ActivityIndicator, 
  ScrollView,
  Image,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { Text, Divider,CheckBox, SearchBar, Input , ListItem } from 'react-native-elements'
import axios from "axios";
import DatePicker from 'react-native-datepicker'
import { FloatingAction } from "react-native-floating-action";

const host = require("../../serverAddress")
const localhost = host.host
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  scene:{
    flex: 1,
    paddingTop: 25,
  },
  input: {
    margin: 5,
    height: 40,
    borderColor: '#808080',
    width:200,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 15
 },
 TouchableOpacityStyle: {
  position: 'absolute',
  marginTop: 15,
  width: 50,
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
  right: 30,
  elevation: 3,
  backgroundColor: 'orange',
  borderRadius: 25
},
});


class TarefaAddScreen extends Component {
  static navigationOptions = {
    title: 'Nova Tarefa',
  };
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      descricao: '',
      data: '',
      estado: '',
      nr_auxiliar:'',
      error: null,
      checked: false,
    }
  }

  componentWillMount(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today =  yyyy+ '-' + mm + '-' + dd;
    this.setState({data: today})

  }

  addTarefa = () => {
    axios.post(localhost+"/api/tarefas/",{
      nome: this.state.nome,
      descricao: this.state.descricao,
      data: this.state.data,
      nr_auxiliar: this.props.navigation.state.params.id
    })
      .then(() =>{
        alert("Tarefa adicionada com sucesso")
        this.props.navigation.push("TarefasDashNavigator")
        })
      .catch(() => alert("Erro na adição da Tarefa"))
  }

  render () {
    
    return (
      <KeyboardAvoidingView behavior="padding" enabled 
        style={{
          flex: 1,
          flexDirection: 'column',
          margin: 10,
        }}>
          <ScrollView>
        <Text h3>Tarefa</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 5}}>
            <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>Nome: </Text>
            <TextInput
                style={{
                  marginTop: 5,
                  marginHorizontal: 5,
                  height: 30,
                  borderColor: '#808080',
                  width:200,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderRadius: 15,
                  paddingHorizontal: 10,}}
                placeholder="Escreva aqui ..."
                value={this.state.nome}
                onChangeText={(val) => {this.setState({nome: val})}}
            />
        </View>
        <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between', margin: 5}}>
            <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>Descrição: </Text>
            <TextInput
                style={{
                  marginTop: 5,
                  marginHorizontal: 5,
                  height: 30,
                  borderColor: '#808080',
                  width:200,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderRadius: 15,
                  paddingHorizontal: 10,}}
                placeholder="Escreva aqui ..."
                value={this.state.apelido}
                onChangeText={(val) => {this.setState({descricao: val})}}
            />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 5}}>
            <Text style={{fontSize: 20,fontWeight: '300'}}>Data: </Text>
            <DatePicker
                style={{width: 200, marginRight: 5}}
                date={this.state.data}
                mode="date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                onPressDate
                onDateChange={(date) => {this.setState({data: date})}}
            />
        </View>   
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={()=>this.addTarefa()}
            style={styles.TouchableOpacityStyle}>
            <Image
                source={
                  require('../../assets/images/addSimple.png')
                }
                resizeMode='contain'
                style={{
                  flex: 1,
                  height: 40,
                  width: 40
                }}
              />
          </TouchableOpacity>
        </View>
        <View style={{height: 90}}/>
      </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
export default TarefaAddScreen;
