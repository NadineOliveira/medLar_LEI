import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  RefreshControl,
  ScrollView, Image
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

class TarefasScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      tarefas: [],
      tarefasOriginal: [],
      error: null,
      refreshing: false
    }
    this.getTarefas = this.getTarefas.bind(this);
  }

  updateSearch = (e) => {
    if(e==='') 
      this.setState({utentes: this.state.tarefasOriginal,search: ''})
    else {const newData = this.state.tarefasOriginal.filter(o => {
      return Object.keys(o).some(k => JSON.stringify(o[k]).toLowerCase().includes(e.toLowerCase()));
    });
    this.setState({tarefas: newData, search: e});
    }
  };

  getTarefas = () =>{
    axios.get(localhost+"/api/tarefas/",)
      .then(res => {
          this.setState({tarefas: res.data, tarefasOriginal: res.data, refreshing: false})
      })
      .catch(error => this.setState({error: error}))
  }

  concluirTarefa = (id) => {
    axios.get(localhost+'/api/tarefas/concluir/'+id)
    .then(res => {
      alert("Tarefa concluida")
      this.componentWillMount()
    })
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.componentWillMount()
  }
  
  keyExtractor = (item, index) => index.toString()
  
  renderItem = ({ item }) => {
     return <ListItem
              title={`${item.nome}`}
              subtitle={<View>
                <Text>{item.descricao}</Text>
                <Text>{'Data para Execução: '+item.data}</Text>
              </View>}
              rightIcon={item.estado === 1 ? (
                <Image 
                  source={require('../assets/images/check.png')}
                  style={{ height: 24, width: 24, marginLeft: 25}}
                />
                ) : (
                <Image 
                  source={require('../assets/images/radio.png')}
                  style={{ height: 24, width: 24, marginLeft: 25}}
                />)}
              button
              onPress={() => {if(item.estado===0) this.concluirTarefa(item.id_Tarefa)}}
            />
  }
  componentWillMount() {
    this.getTarefas()
  }
  render () {
    return (
      <ScrollView
      refreshControl={
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}
      />}>
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.tarefas}
        renderItem={this.renderItem}
      />
      </ScrollView> 
    )
  }
}
export default TarefasScreen;
