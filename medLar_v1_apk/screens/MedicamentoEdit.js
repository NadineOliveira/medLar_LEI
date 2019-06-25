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
import { Text, Divider,CheckBox, SearchBar, Input , ListItem, Button, Icon  } from 'react-native-elements'
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
      id_med: this.props.navigation.state.params.id_med,
      medicamento: {},
      qt: '',
      preco: ''
    }
    this.addMedicamento = this.addMedicamento.bind(this);
    this.getMedicamento = this.getMedicamento.bind(this);
  }

  getMedicamento = (nr) =>{
    axios.get(localhost+"/api/medicamentos/"+nr)
      .then(res => {
        this.setState({medicamento: res.data, qt: ''+res.data.quantidade, preco: ''+res.data.preco})
      })
      .catch(error => this.setState({error: error}))
  }
  
  componentWillMount() {
    this.getMedicamento(this.state.id_med)
  }

  addMedicamento = () => {
    axios.get(localhost+"/api/medicamentos/"+this.state.id_med+'?qt='+this.state.qt+'&price='+this.state.preco)
      .then(() =>{
                    alert("Medicamento Atualizado com sucesso")
                    this.props.navigation.push("MedicamentosDashNavigator")
                  })
      .catch(() => alert("Erro na atualização de medicamento"))
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
                editable={false}
                style={styles.inputBig}
                placeholder="Escreva aqui ..."
                value={this.state.medicamento.nome}
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
                editable={false}
                  style={styles.input}
                  placeholder="Escreva aqui ..."
                  value={this.state.medicamento.dosagem}
                />
            <TextInput
                editable={false}
                  style={styles.input}
                  placeholder="Escreva aqui ..."
                  value={this.state.medicamento.formato}
                />
          </View>
            <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
              Quantidade:
            </Text><Icon name='edit' /></View>
            <TextInput
                  style={styles.inputBig}
                  placeholder="Escreva aqui ..."
                  value={this.state.qt}
                  onChangeText={(val) => {this.setState({qt: val})}}
            />

            <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
            Laboratório: 
            </Text>
            <TextInput
                  editable={false}
                  style={styles.inputBig}
                  placeholder="Escreva aqui ..."
                  value={this.state.medicamento.lab}
            />

          <View style={styles.item}>
            <Text style={styles.text}>
              Unidade p/Emb.: 
            </Text>
            <Text style={styles.text}>
                Preço p/emb: 
              </Text><Icon name="edit"/>
          </View>

          <View style={styles.item}>
              <TextInput
                    editable={false}
                    style={styles.input}
                    placeholder="Escreva aqui ..."
                    value={''+this.state.medicamento.uni_emb}
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
