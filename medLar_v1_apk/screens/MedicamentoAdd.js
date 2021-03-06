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
  KeyboardAvoidingView,
  Picker
} from "react-native";
import { Text, Divider,CheckBox, SearchBar, Input , ListItem, Button } from 'react-native-elements'
import axios from "axios";
import DatePicker from 'react-native-datepicker'
import { FloatingAction } from "react-native-floating-action";
import { TextInput } from "react-native-gesture-handler";

const host = require("../serverAddress")
const localhost = host.host
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 10
  },
  item: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  text: {
    marginTop: 5,
    marginHorizontal: 10,
    height: 30,
    width: 185,
    fontSize: 15,
    fontWeight: '200', 
    textAlignVertical: 'center'
    },
  input: {
    margin: 10,
    height: 30,
    width: 185,
    paddingHorizontal: 10,
    borderColor: '#808080',
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 20
  },
  inputBig: {
    margin: 5,
    height: 30,
    width: 300,
    paddingHorizontal: 10,
    borderColor: '#808080',
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 20
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    marginTop: 10,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    elevation: 3,
    backgroundColor: 'orange',
    borderRadius: 25
  },
})

class MedicamentoAddScreen extends Component {
  static navigationOptions = {
    title: 'Novo Medicamento',
  };
  constructor(props) {
    super(props);
    this.state = {
      nome:'',
      preco:'',
      lab:'',
      uni:'',
      dosagem:'',
      qt:'',
      formato: 'comp'
    }
    this.addMedicamento = this.addMedicamento.bind(this);
  }

  addMedicamento = () => {
    axios.post(localhost+"/api/medicamentos/",{
      nome: this.state.nome,
      preco: this.state.preco,
      lab: this.state.lab,
      uni_emb: this.state.uni,
      formato: this.state.formato,
      dosagem: this.state.dosagem,
      quantidade: this.state.qt
    })
      .then(() =>{
                    alert("Medicamento Adicionado com sucesso")
                    this.props.navigation.push("MedicamentosDashNavigator")
                  })
      .catch(() => alert("Erro na adição de medicamento"))
    //falta rota
  }

  render () {
    
    return (
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
          <ScrollView>
          <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
            Nome do medicamento: 
          </Text>
          <TextInput
                style={styles.inputBig}
                placeholder="Escreva aqui ..."
                value={this.state.nome}
                onChangeText={(val) => {this.setState({nome: val})}}
          />

          <View style={styles.item}>
            <Text style={styles.text}>
              Dosagem: 
            </Text>
            <Text style={styles.text}>
              Forma: 
            </Text>
          </View>

          <View style={styles.item}>
            <TextInput
                  style={styles.input}
                  placeholder="Escreva aqui ..."
                  value={this.state.dosagem}
                  onChangeText={(val) => {this.setState({dosagem: val})}}
                />
            <Picker
              selectedValue={this.state.formato}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({formato: itemValue})
              }>
              <Picker.Item label="comprimidos" value="comp" />
              <Picker.Item label="miligramas" value="mg" />
              <Picker.Item label="mililitros" value="ml" />
              <Picker.Item label="Gotas" value="gotas" />
            </Picker>
          </View>

            <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
              Quantidade: 
            </Text>
            <TextInput
                  style={styles.input}
                  placeholder="Escreva aqui ..."
                  value={this.state.qt}
                  onChangeText={(val) => {this.setState({qt: val})}}
            />

            <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
            Laboratório: 
            </Text>
            <TextInput
                  style={styles.inputBig}
                  placeholder="Escreva aqui ..."
                  value={this.state.lab}
                  onChangeText={(val) => {this.setState({lab: val})}}
            />

          <View style={styles.item}>
          <Text style={styles.text}>
            Unidade p/Emb.: 
          </Text>
          <Text style={styles.text}>
            Preço p/emb: 
          </Text>
          </View>

          <View style={styles.item}>
              <TextInput
                    style={styles.input}
                    placeholder="Escreva aqui ..."
                    value={this.state.uni}
                    onChangeText={(val) => {this.setState({uni: val})}}
              />
              <TextInput
                    style={styles.input}
                    placeholder="Escreva aqui ..."
                    value={this.state.preco}
                    onChangeText={(val) => {this.setState({preco: val})}}
              />

          </View>
          <View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={()=>this.addMedicamento()}
            style={styles.TouchableOpacityStyle}>
            <Image
                source={
                  require('../assets/images/save.png')
                }
                resizeMode='contain'
                style={{
                  flex: 1,
                  height: 35,
                  width: 35
                }}
              />
          </TouchableOpacity>
          </View>
          <View style={{height: 75}}/>
          </ScrollView>
          </KeyboardAvoidingView>       
    )
  }
}
export default MedicamentoAddScreen;
