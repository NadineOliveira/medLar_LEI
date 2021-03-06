import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  FlatList,
  ScrollView, 
} from "react-native";
import { SearchBar , ListItem } from 'react-native-elements'
import axios from "axios";

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
  }
});

class UtentesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      utentes: [],
      utentesOriginal: [],
      error: null,
      update: false,
      refreshing: false,
    }

   
    this.getUsers = this.getUsers.bind(this);
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

  getUsers = () =>{
    axios.get(localhost+"/api/utentes/ativos")
      .then(res => {
        this.setState({utentes: res.data, utentesOriginal: res.data, refreshing: false})
      })
      .catch(error => this.setState({error: error}))
  }
  
  goToMedicamentosUtente = (nr) =>{
    this.props.navigation.push('UtenteDashNavigator', {
      nr_processo: nr
    });
  }
  
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.componentWillMount()
  }

  keyExtractor = (item, index) => index.toString()
  
  renderItem = ({ item }) => {
    if(item.genero === 'M') 
     return <ListItem
              title={`Sr. ${item.nome} ${item.apelido}`}
              subtitle={item.faltam ? <Text>{'Em Falta: '+item.faltam+' Medicamentos'}</Text>:<Text>Caixa Preenchida</Text> }
              leftAvatar={{source: require("../assets/images/maleIcon.png")}}
              rightIcon={item.faltam ? <Text style={{color: 'orange'}}>Ver</Text> : <Text style={{color: 'green'}}>Ver</Text>} 
              button
              onPress={() => {this.goToMedicamentosUtente(item.nr_processo)}}
            />
    else  
     return <ListItem
             title={`D. ${item.nome} ${item.apelido}`}
             subtitle={item.faltam ? <Text>{'Em Falta: '+item.faltam+' Medicamentos'}</Text>:<Text>Caixa Preenchida</Text> }
             leftAvatar={{source: require("../assets/images/femaleIcon.png")}}
             rightIcon={item.faltam ? <Text style={{color: 'orange'}}>Ver</Text> : <Text style={{color: 'green'}}>Ver</Text>} 
             button
             onPress={() => {this.goToMedicamentosUtente(item.nr_processo)}}
            />
  }
  componentWillMount() {
    this.getUsers()
  }

  render () {
    return (
    <ScrollView
    refreshControl={
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}
      />
    }>
      <SearchBar
        placeholder="Escreva aqui..."
        onChangeText={e => this.updateSearch(e)} 
        value={this.state.search}
        lightTheme
        round
      />
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.utentes}
        renderItem={this.renderItem}
      />
      </ScrollView> 
    )
  }
}
export default UtentesScreen;
