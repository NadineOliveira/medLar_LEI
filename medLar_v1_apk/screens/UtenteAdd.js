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

const host = require("../serverAddress")
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
const guardar = [
  {
    text: "Adicionar",
    name: "add",
    icon: require("../assets/images/add.png"),
    position: 1
  }
];

class UtenteAddScreen extends Component {
  static navigationOptions = {
    title: 'Info. Utente',
  };
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      nome: '',
      apelido: '',
      genero: '',
      data_nascimento: '',
      contacto: '',
      encarregado: '',
      parentesco: '',
      contacto_enc: '',
      rua: '',
      localidade: '',
      codigo_postal: '',
      cidade: '',
      estado: '',
      error: null,
      checked: false,
      date:"1940-01-01"
    }
  }

  updateSearch = (e) => {
    if(e==='') 
      this.setState({utentes: this.state.utentesOriginal,search: ''})
    else {const newData = this.state.utentesOriginal.filter(o => {
      return Object.keys(o).some(k => JSON.stringify(o[k]).toLowerCase().includes(e.toLowerCase()));
    });
    this.setState({utentes: newData, search: e});
    }
  };

  addUtente = () => {
    axios.post(localhost+"/api/utentes/",{
      nome: this.state.nome,
      apelido: this.state.apelido,
      genero: this.state.genero,
      data_nascimento: this.state.data_nascimento,
      contacto: this.state.contacto,
      encarregado: this.state.encarregado,
      parentesco: this.state.parentesco,
      contacto_enc: this.state.contacto_enc,
      rua: this.state.rua,
      localidade: this.state.localidade,
      codigo_postal: this.state.codigo_postal,
      cidade: this.state.cidade
    })
      .then(() =>{
                    alert("Utente adicionado com sucesso")
                    this.props.navigation.push("UtentesDashNavigator")
                  })
      .catch(() => alert("Erro na adição de Utente"))
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
        <Text h3>Utente</Text>
        <View style={{flexDirection: 'row'}}>
          {
            this.state.genero === 'M' 
              ?   <Image
                    style={{width: 100, height: 100}}
                    source={require('../assets/images/maleIcon.png')}
                  />
              :   <Image
                    style={{width: 100, height: 100}}
                    source={require('../assets/images/femaleIcon.png')}
                  />
          }
          <View style={{flexDirection: 'column', display: 'flex'}}>
            <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>Nome: </Text>
              <TextInput
                style={{
                  marginTop: 5,
                  marginHorizontal: 15,
                  height: 30,
                  borderColor: '#808080',
                  width:200,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderRadius: 15}}
                placeholder="Escreva aqui ..."
                value={this.state.nome}
                onChangeText={(val) => {this.setState({nome: val})}}
              />
            </View>
            <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>Apelido: </Text>
              <TextInput
                style={{
                  marginTop: 5,
                  marginHorizontal: 15,
                  height: 30,
                  borderColor: '#808080',
                  width:200,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderRadius: 15}}
                placeholder="Escreva aqui ..."
                value={this.state.apelido}
                onChangeText={(val) => {this.setState({apelido: val})}}
              />
            </View>
          </View>
        </View>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 5 }}>
          <Text style={{fontSize: 20,fontWeight: '300'}}>Género</Text>
          <Text style={{fontSize: 20,fontWeight: '300'}}>Data Nascimento</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View style={{flexDirection: 'row'}}>
            <CheckBox
              round
              title='M'
              checked={this.state.checked}
              checkedColor='orange'
              onPress={() => this.setState({checked: !this.state.checked, genero: 'M'})}
            />
            <CheckBox
              round
              title='F'
              checked={!this.state.checked}
              checkedColor='orange'
              onPress={() => this.setState({checked: !this.state.checked, genero: 'F'})}
            />
          </View>
          <View style={{marginTop: 7}}><DatePicker
            style={{width: 200}}
            date={this.state.data_nascimento}
            mode="date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            onPressDate
            onDateChange={(date) => {this.setState({data_nascimento: date})}}
          /></View>
        </View>
        <Text h4>Contacto</Text>
        <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
            Nº de Telemovel: 
          </Text>
          <TextInput
            style={{marginTop: 5,
              marginHorizontal: 15,
              height: 30,
              borderColor: '#808080',
              width:200,
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 15}}
            placeholder="Escreva aqui ..."
            value={this.state.contacto}
            onChangeText={(val) => {this.setState({contacto: val})}}
          />
        </View>
        <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
            Encarregado: 
          </Text>
          <TextInput
            style={{
              marginTop: 5,
              marginHorizontal: 15,
              height: 30,
              borderColor: '#808080',
              width:200,
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 15}}
            placeholder="Escreva aqui ..."
            value={this.state.encarregado}
            onChangeText={(val) => {this.setState({encarregado: val})}}
          />
        </View>
        <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
            Parentesco: 
          </Text>
          <TextInput
            style={{
              marginTop: 5,
              marginHorizontal: 15,
              height: 30,
              borderColor: '#808080',
              width:200,
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 15}}
            placeholder="Escreva aqui ..."
            value={this.state.parentesco}
            onChangeText={(val) => {this.setState({parentesco: val})}}
          />
        </View>
        <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
            Telemovel Enc.: 
          </Text>
          <TextInput
            style={{
              marginTop: 5,
              marginHorizontal: 15,
              height: 30,
              borderColor: '#808080',
              width:200,
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 15}}
            placeholder="Escreva aqui ..."
            value={this.state.contacto_enc}
            onChangeText={(val) => {this.setState({contacto_enc: val})}}
          />
        </View>
        <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
            Rua: 
          </Text>
          <TextInput
            style={{
              marginTop: 5,
              marginHorizontal: 15,
              height: 30,
              borderColor: '#808080',
              width:200,
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 15}}
            placeholder="Escreva aqui ..."
            value={this.state.rua}
            onChangeText={(val) => {this.setState({rua: val})}}
          />
        </View>
        <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
            Localidade: 
          </Text>
          <TextInput
            style={{
              marginTop: 5,
              marginHorizontal: 15,
              height: 30,
              borderColor: '#808080',
              width:200,
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 15}}
            placeholder="Escreva aqui ..."
            value={this.state.localidade}
            onChangeText={(val) => {this.setState({localidade: val})}}
          />
        </View>
        <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
            Código Postal: 
          </Text>
          <TextInput
            style={{
              marginTop: 5,
              marginHorizontal: 15,
              height: 30,
              borderColor: '#808080',
              width:200,
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 15}}
            placeholder="Escreva aqui ..."
            value={this.state.codigo_postal}
            onChangeText={(val) => {this.setState({codigo_postal: val})}}
          />
        </View>
        <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
            Cidade: 
          </Text>
          <TextInput
            style={{
              marginTop: 5,
              marginHorizontal: 15,
              height: 30,
              borderColor: '#808080',
              width:200,
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 15}}
            placeholder="Escreva aqui ..."
            value={this.state.cidade}
            onChangeText={(val) => {this.setState({cidade: val})}}
          />
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={()=>this.addUtente()}
            style={styles.TouchableOpacityStyle}>
            <Image
                source={
                  require('../assets/images/addSimple.png')
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
export default UtenteAddScreen;
