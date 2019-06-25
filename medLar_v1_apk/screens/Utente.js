import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SearchBar , ListItem, Text} from 'react-native-elements'
import axios from "axios";
import { Item } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import NestedListView, {NestedRow} from 'react-native-nested-listview'

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

  TouchableOpacityStyle: {
    position: 'absolute',
    marginTop: 15,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: 30,
    elevation: 3,
    backgroundColor: 'orange',
    borderRadius: 25
  },

});

class UtenteScreen extends Component {
  static navigationOptions = {
    title: 'Medicamentos p/ Utente',
  };
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      utente: {},
      medsUtente: [],
      nr_processo: this.props.navigation.state.params.nr_processo,
      error: null
    }
    this.getUtente = this.getUtente.bind(this);
    this.getMedUtente = this.getMedUtente.bind(this);
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

  getUtente = (nr) =>{
    axios.get(localhost+"/api/utentes/"+nr)
      .then(res => {
        this.setState({utente: res.data})
      })
      .catch(error => this.setState({error: error}))
  }
  
  getMedUtente = (nr) =>{
    axios.get(localhost+"/api/slots/medicamentos/"+nr)
      .then(res => {
        this.setState({medsUtente: res.data})
      })
      .catch(error => this.setState({error: error}))
  }

  checkMedicamentoUtente = (node) =>{
    if(!node.horarios){
      if(node.estado === 0)
        axios.post(localhost+'/api/slots/repor',{med: node.med, utente: node.nr_utente, horario: node.idHorario, quantidade: node.quantidade})
          .then(()=> {alert("Medicamento adicionado à caixa"); this.componentWillMount()})
          .catch(() => alert("Erro na adição de medicamento, tente novamente"))
      else
        axios.post(localhost+'/api/slots/esvaziar',{med: node.med, utente: node.nr_utente, horario: node.idHorario})
          .then(()=> {alert("Medicamento retirado da caixa"); this.componentWillMount()})
          .catch(() => alert("Erro na remoção de medicamento, tente novamente"))
    }
  }
  goToUtente = (nr) => {
    this.props.navigation.navigate('UtenteEditNavigator', {
      nr_processo: nr
    });
  }
  printHorarios = (horarios) => {
    var ret = []
    for(i in horarios)
      ret.push(<Text>{horarios[i].dia+' - '+horarios[i].periodo}</Text>)
    return ret
  }
  keyExtractor = (item, index) => index.toString()
  
  renderItem = ({ item }) => {
     return <ListItem
             title={item.medicamento.nome}
             subtitle={<View>
                        {this.printHorarios(item.horarios)}
                       </View>} 
             button
             onPress={() => {this.checkMedicamentoUtente(item.med,item.nr_utente)}}
            />
  }
  componentWillMount() {
    this.getUtente(this.state.nr_processo)
    this.getMedUtente(this.state.nr_processo)
  }

  render () {
    return (
    <View>
      {this.state.utente.genero === "M" ? (
        <ListItem
          title={`Sr. ${this.state.utente.nome} ${this.state.utente.apelido}`}
          subtitle={this.state.utente.faltam ? <Text>{'Em Falta: '+this.state.utente.faltam+' Medicamentos'}</Text>:<Text>Caixa Preenchida</Text> }
          leftAvatar={{source: require("../assets/images/maleIcon.png")}}
          rightIcon={<Text style={{color: 'green'}}>Editar</Text>} 
          button
          onPress={() => {this.goToUtente(this.state.utente.nr_processo)}}
        />
      ) : (
        <ListItem
          title={`D. ${this.state.utente.nome} ${this.state.utente.apelido}`}
          subtitle={this.state.utente.faltam ? <Text>{'Em Falta: '+this.state.utente.faltam+' Medicamentos'}</Text>:<Text>Caixa Preenchida</Text> }
          leftAvatar={{source: require("../assets/images/femaleIcon.png")}}
          rightIcon={<Text style={{color: 'green'}}>Editar</Text>} 
          button
          onPress={() => {this.goToUtente(this.state.utente.nr_processo)}}
        />
      )}
      <ScrollView>
      <NestedListView
        data={this.state.medsUtente}
        getChildrenName={(node) => 'horarios'}
        onNodePressed={(node) => this.checkMedicamentoUtente(node)}
        renderNode={(node, level) => (
          <NestedRow
            level={level}
          >
            {node.medicamento 
            ? (
                <View style={{ marginRight: 5, marginLeft: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 16, fontWeight: '200', textAlignVertical: 'center'}}>{node.medicamento.nome}</Text>
                    <Text style={{fontSize: 12, fontWeight: '100', textAlignVertical: 'center'}}>{'Data de Inicio: '+node.data_inicio}</Text>
                    <Text style={{fontSize: 12, fontWeight: '100', textAlignVertical: 'center'}}>{node.data_fim ? ('Data de Fim: '+ node.data_fim) : ('Data de Fim: Indeterminado')}</Text>
                  </View>
                  <View style={{alignVertical: 'center'}}>
                    {node.opened === true ? (
                        <Image 
                          source={require('../assets/images/upArrow.png')}
                          style={{ height: 24, width: 24, marginLeft: 25}}
                        />
                        ) : (
                        <Image 
                          source={require('../assets/images/downArrow.png')}
                          style={{ height: 24, width: 24, marginLeft: 25}}
                        />)
                    }
                  </View>
                </View>
              ) 
            : (
                <View style={{marginLeft: 20, marginRight: 15, flexDirection: "row", justifyContent: 'space-between'}}>
                  <View style={{flexDirection: 'column'}}>
                    <Text>{'Dia: '+node.dia}</Text>
                    <Text>{'Periodo: '+node.periodo}</Text>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text>{node.quantidade+' qt.'}</Text>
                    {node.estado === 0 ? (
                          <Image 
                            source={require('../assets/images/radio.png')}
                            style={{ height: 24, width: 24, marginLeft: 25}}
                          />
                          ) : (
                          <Image 
                            source={require('../assets/images/check.png')}
                            style={{ height: 24, width: 24, marginLeft: 25}}
                          />)
                      }
                  </View>
                </View>
              ) }
          </NestedRow>
        )}
      />
      </ScrollView>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={()=>this.props.navigation.navigate("MedicamentoAddUtenteNav", {
            nr_processo: this.state.nr_processo
          })}
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
              //You can use you project image Example below
              //source={require('./images/float-add-icon.png')}
              //style={styles.FloatingButtonStyle}
            />
        </TouchableOpacity>
      </View>
      </View> 
    )
  }
}
export default UtenteScreen;
