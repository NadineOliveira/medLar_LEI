import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
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
import NestedListview, {NestedRow} from 'react-native-nested-listview'


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
})

const data = [{title: 'Pequeno Almoço'},{title: 'Almoço'}, {title: 'Jantar',items: [{title: 'Almoço'}, {title: 'Jantar'}]}]


class MedicamentoAddUtenteScreen extends Component {
  static navigationOptions = {
    title: 'Adicionar Medicamento',
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
      showP: false,
      segunda:false, terca:false,quarta:false,quinta:false,sexta:false,sabado:false,domingo:false,
      showA: false,
      segundaA:false, tercaA:false,quartaA:false,quintaA:false,sextaA:false,sabadoA:false,domingoA:false,
      showJ: false,
      segundaJ:false, tercaJ:false,quartaJ:false,quintaJ:false,sextaJ:false,sabadoJ:false,domingoJ:false

    }
  }

  ShowHideComponent = () => {
    if (this.state.showP == true) {
      this.setState({ showP: false });
    } else {
      this.setState({ showP: true });
    }
  };
  ShowHideComponentA = () => {
    if (this.state.showA == true) {
      this.setState({ showA: false });
    } else {
      this.setState({ showA: true });
    }
  };
  ShowHideComponentJ = () => {
    if (this.state.showJ == true) {
      this.setState({ showJ: false });
    } else {
      this.setState({ showJ: true });
    }
  };

  editMedicamento = () => {
      
    //falta rota
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
              Data Inicio: 
            </Text>
            <Text style={styles.text}>
              Data Fim: 
            </Text>
          </View>

          <View style={styles.item}>
            <DatePicker
                style={{width: 200}}
                date={this.state.data_nascimento}
                mode="date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                onPressDate
                onDateChange={(date) => {this.setState({data_nascimento: date})}}
            />
            <DatePicker
                style={{width: 200}}
                date={this.state.data_nascimento}
                mode="date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                onPressDate
                onDateChange={(date) => {this.setState({data_nascimento: date})}}
            />
          </View>

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
              <Picker.Item label="miligramas" value="mg" />
              <Picker.Item label="mililitros" value="ml" />
              <Picker.Item label="Gotas" value="gotas" />
            </Picker>
          </View>
              
          <NestedListview
            data={data}
            getChildrenName={(node) => 'items'}
            onNodePressed={(node) => alert('Secalhar é fazer um form com as checkbox')}
            renderNode={(node, level) => (
              <NestedRow
                level={level}
                style={styles.row}
              >
                <Text>{node.title}</Text>
              </NestedRow>
            )}
          />
          </View>
           
        
    )
  }
}
export default MedicamentoAddUtenteScreen;
