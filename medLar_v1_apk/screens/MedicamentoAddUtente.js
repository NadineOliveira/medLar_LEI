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
      show: false,
      segunda:false,
      terca:false,
      quarta:false,
      quinta:false,
      sexta:false,
      sabado:false,
      domingo:false

    }
  }

  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
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

          <View style={styles.container}>
           {/*Here we will return the view when state is true 
           and will return false if state is false*/}
           <Button title="Pequeno Almoço" onPress={this.ShowHideComponent} />
           {this.state.show ? (
             <View>
             <CheckBox
              round
              title='Segunda'
              checked={this.state.segunda}
              checkedColor='orange'
              onPress={() => this.setState({segunda: !this.state.segunda})}
           />
           <CheckBox
              round
              title='Terca'
              checked={this.state.terca}
              checkedColor='orange'
              onPress={() => this.setState({terca: !this.state.terca})}
           />
           <CheckBox
              round
              title='Quarta'
              checked={this.state.quarta}
              checkedColor='orange'
              onPress={() => this.setState({quarta: !this.state.quarta})}
           />
           <CheckBox
              round
              title='Quinta'
              checked={this.state.quinta}
              checkedColor='orange'
              onPress={() => this.setState({quinta: !this.state.quinta})}
           />
           <CheckBox
              round
              title='Sexta'
              checked={this.state.sexta}
              checkedColor='orange'
              onPress={() => this.setState({sexta: !this.state.sexta})}
           />
           <CheckBox
              round
              title='Sabado'
              checked={this.state.sabado}
              checkedColor='orange'
              onPress={() => this.setState({sabado: !this.state.sabado})}
           />
           <CheckBox
              round
              title='Domingo'
              checked={this.state.domingo}
              checkedColor='orange'
              onPress={() => this.setState({domingo: !this.state.domingo})}
           />
           </View>
           ) : null}
          </View>
          </View>
           
        
    )
  }
}
export default MedicamentoAddUtenteScreen;
