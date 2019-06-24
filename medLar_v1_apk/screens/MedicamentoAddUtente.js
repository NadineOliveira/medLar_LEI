import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Picker,
  TouchableHighlight,
  Alert
} from "react-native";
import { Text, Divider,CheckBox, SearchBar, Input , ListItem, Button, Overlay } from 'react-native-elements'
import axios from "axios";
import DatePicker from 'react-native-datepicker'
import { FloatingAction } from "react-native-floating-action";
import { TextInput } from "react-native-gesture-handler";
import NestedListview, {NestedRow} from 'react-native-nested-listview'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
const icon = require('../assets/images/add.png');

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

const items = [
  {
    name: 'Segunda-Feira',
    id: 2,
    icon: icon, // Make sure the icon const is set, or you can remove this
    children: [
      {
        name: 'Pequeno Almoço',
        id: 1,
      },
      {
        name: 'Almoço',
        id: 2,
      },
      {
        name: 'Lanche',
        id: 3,
      },
      {
        name: 'Jantar',
        id: 4,
      },
      {
        name: 'Ceia',
        id: 5,
      },
    ],
  },
  {
    name: 'Terça-Feira',
    id: 3,
    icon: icon, // Make sure the icon const is set, or you can remove this
    children: [
      {
        name: 'Pequeno Almoço',
        id: 6,
      },
      {
        name: 'Almoço',
        id: 7,
      },
      {
        name: 'Lanche',
        id: 8,
      },
      {
        name: 'Jantar',
        id: 9,
      },
      {
        name: 'Ceia',
        id: 10,
      },
    ],
  },
  {
    name: 'Quarta-Feira',
    id: 4,
    icon: icon, // Make sure the icon const is set, or you can remove this
    children: [
      {
        name: 'Pequeno Almoço',
        id: 11,
      },
      {
        name: 'Almoço',
        id: 12,
      },
      {
        name: 'Lanche',
        id: 13,
      },
      {
        name: 'Jantar',
        id: 14,
      },
      {
        name: 'Ceia',
        id: 15,
      },
    ],
  },
  {
    name: 'Quinta-Feira',
    id: 5,
    icon: icon, // Make sure the icon const is set, or you can remove this
    children: [
      {
        name: 'Pequeno Almoço',
        id: 16,
      },
      {
        name: 'Almoço',
        id: 17,
      },
      {
        name: 'Lanche',
        id: 18,
      },
      {
        name: 'Jantar',
        id: 19,
      },
      {
        name: 'Ceia',
        id: 20,
      },
    ],
  },
  {
    name: 'Sexta-Feira',
    id: 6,
    icon: icon, // Make sure the icon const is set, or you can remove this
    children: [
      {
        name: 'Pequeno Almoço',
        id: 21,
      },
      {
        name: 'Almoço',
        id: 22,
      },
      {
        name: 'Lanche',
        id: 23,
      },
      {
        name: 'Jantar',
        id: 24,
      },
      {
        name: 'Ceia',
        id: 25,
      },
    ],
  },
  {
    name: 'Sabado',
    id: 7,
    icon: icon, // Make sure the icon const is set, or you can remove this
    children: [
      {
        name: 'Pequeno Almoço',
        id: 26,
      },
      {
        name: 'Almoço',
        id: 27,
      },
      {
        name: 'Lanche',
        id: 28,
      },
      {
        name: 'Jantar',
        id: 29,
      },
      {
        name: 'Ceia',
        id: 30,
      },
    ],
  },
  {
    name: 'Domingo',
    id: 8,
    icon: icon, // Make sure the icon const is set, or you can remove this
    children: [
      {
        name: 'Pequeno Almoço',
        id: 31,
      },
      {
        name: 'Almoço',
        id: 32,
      },
      {
        name: 'Lanche',
        id: 33,
      },
      {
        name: 'Jantar',
        id: 34,
      },
      {
        name: 'Ceia',
        id: 35,
      },
    ],
  },
];

class MedicamentoAddUtenteScreen extends Component {
  static navigationOptions = {
    title: 'Adicionar Medicamento',
  };
  constructor(props) {
    super(props);

    this.state = {
      nr_processo: this.props.navigation.state.params.nr_processo,
      nome:'',
      dosagem:'',
      selected: '',
      quant: '',
      lenghtSelectedItems: 0,
      qt: [],
      data_inicio: '',
      data_fim: '',
      selectedItems: [],
      medicamentos: [],
      medicamentoSel:'',
      medicamentoID: '',
      isVisible: false
    }
  }

  componentWillMount(){
    this.getMedicamentos();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today =  yyyy+ '-' + mm + '-' + dd;
    this.setState({data_fim: today, data_inicio:today})
  }

  handleSubmit= () => {
    var quantidades = []
    for(i in this.state.qt) {
      var id = this.state.qt[i].id
      if(this.state.selectedItems.includes(id))
        quantidades.push(this.state.qt[i])
    }
    axios.post(localhost+"/api/slots/slot",{
      med: this.state.medicamentoID,
      nr_utente: this.state.nr_processo,
      data_inicio: this.state.data_inicio,
      data_fim: this.state.data_fim,
    })
      .then(() =>{
                this.props.navigation.push("Lista de Medicamentos")
      })
      .catch(() => alert("Erro na adição de medicamento"))

    axios.post(localhost+"/api/slots/horario",{
      qt: quantidades,
      med: this.state.medicamentoID,
      nr_utente: this.state.nr_processo,
    })
      .then(() =>{
                this.props.navigation.push("Lista de Medicamentos")
      })
      .catch(() => alert("Erro na adição de medicamento"))
  }

  getMedicamentos= () =>{
    axios.get(localhost+"/api/medicamentos/")
      .then(res => {
        const medicamentos = res.data.map( med => {
          return <Picker.Item key={med.id_med} value={med.nome} label={med.nome} />
        });
        this.setState({medicamentos: medicamentos })
        this.setState({medicamentoID: this.state.medicamentos[0].key })
        this.setState({medicamentoSel: this.state.medicamentos[0].value })
      })
      .catch(error => this.setState({error: error}))
  }

  onSelectedItemsChange = (selectedItems,index) => {
    var lengthOld = this.state.lenghtSelectedItems
    this.setState({lastIndex: selectedItems[selectedItems.length-1]}) 
    
    if(lengthOld < selectedItems.length)
      this.setState({isVisible: true, lenghtSelectedItems: selectedItems.length})
    else
      this.setState({lenghtSelectedItems: this.state.lenghtSelectedItems-1})

    this.setState({ selectedItems: selectedItems });
  };

  setQuantidades = () => {
    var qts = this.state.qt
    qts.push({'id': this.state.lastIndex,'val': this.state.quant})
    this.setState({qt: qts, quant: '', isVisible: false})
  }

  render () {
    
    return (
        <View style={styles.container}>
          <Text style={{fontSize: 20,fontWeight: '300', textAlignVertical: 'center'}}>
            Nome do medicamento: 
          </Text>
          <Picker
              selectedValue={this.state.medicamentoSel}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({medicamentoSel: itemValue,
                              medicamentoID: this.state.medicamentos[itemIndex].key})
              }>
              {this.state.medicamentos}
            </Picker>

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
                date={this.state.data_inicio}
                mode="date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                onPressDate
                onDateChange={(date) => {this.setState({data_inicio: date})}}
            />
            <DatePicker
                style={{width: 200}}
                date={this.state.data_fim}
                mode="date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                onPressDate
                onDateChange={(date) => {this.setState({data_fim: date})}}
            />
          </View>

          <View >
            <Text style={styles.text}>
              Forma: 
            </Text>
            <Picker
              selectedValue={this.state.forma}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({dosagem: itemValue})
              }>
              <Picker.Item label="comprimidos" value="comp" />
              <Picker.Item label="miligramas" value="mg" />
              <Picker.Item label="mililitros" value="ml" />
              <Picker.Item label="Gotas" value="gotas" />
            </Picker>
          </View>

        <View>
          <SectionedMultiSelect
            items={items}
            uniqueKey="id"
            subKey="children"
            iconKey="icon"
            selectText="Periodicidade"
            showDropDowns={true}
            readOnlyHeadings={true}
            onSelectedItemsChange={(val,index) => this.onSelectedItemsChange(val,index)}
            selectedItems={this.state.selectedItems}
          />
        </View>

        <Button onPress={this.handleSubmit} title="Adicionar" />
        
        <Overlay
          isVisible={this.state.isVisible}
          height={150}
          width={250}
        >
          <View>
            <Text style={styles.text}>Quantidade</Text>
            <TextInput
                  style={styles.input}
                  placeholder="Escreva aqui ..."
                  value={this.state.quant}
                  onChangeText={(val) => this.setState({quant: val})}//guardaqt(val,uniquekey)
                />
            <Button title="Confirmar" onPress={() => this.setQuantidades()} />
          </View>
        </Overlay>

      </View>
           
        
    )
  }
}
export default MedicamentoAddUtenteScreen;
