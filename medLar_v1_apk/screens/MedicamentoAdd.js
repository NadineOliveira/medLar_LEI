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
      qt:''
    }
  }

  addMedicamento = () => {
    axios.post("http://192.168.1.25:8000/api/medicamentos/",{
      nome: this.state.nome,
      preco = this.state.preco,
      lab = this.state.lab,
      uni_emb = this.state.uni,
      formato = this.state.dosagem,
      dosagem = req.body.dosagem,
      quantidade = this.state.qt,
      
    })
      .then(() =>{
                    alert("Utente adicionado com sucesso")
                    this.props.navigation.push("UtentesDashNavigator")
                  })
      .catch(() => alert("Erro na adição de Utente"))
  }

  render () {
    
    return (
        <View style={styles.container}>
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
              Quantidade: 
            </Text>
            <Text style={styles.text}>
              Forma: 
            </Text>
          </View>

          <View style={styles.item}>
            <TextInput
                  style={styles.input}
                  placeholder="Escreva aqui ..."
                  value={this.state.qt}
                  onChangeText={(val) => {this.setState({qt: val})}}
                />
            <Picker
              selectedValue={this.state.forma}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({dosagem: itemValue})
              }>
              <Picker.Item label="Quantidade" value="qt" />
              <Picker.Item label="miligramas" value="mg" />
              <Picker.Item label="mililitros" value="ml" />
              <Picker.Item label="Gotas" value="gotas" />
            </Picker>
          </View>
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

          <View style={{flexDirection: 'row', display: 'flex',justifyContent: 'space-between', margin: 5}}>
            <Button
              color='red'
              title='Desativar'
              onPressItem={name => {
                if(name==="delete")
                  this.closeUtente()
              }}
              />
            <Button
              color='orange'
              title="Guardar"
              onPressItem={name => {
                if(name==="save")
                  this.updateUtente()
              }}
            />
            </View>

          </View>
        
    )
  }
}
export default MedicamentoAddScreen;
