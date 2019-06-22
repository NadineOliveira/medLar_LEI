import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ListView,
  FlatList,
  ActivityIndicator, ScrollView, Image
} from "react-native";
import { SearchBar , ListItem } from 'react-native-elements'
import axios from "axios";

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
    axios.get("http://192.168.1.67:8000/api/tarefas/",)
      .then(res => {
          alert(JSON.stringify(res.data))
        this.setState({tarefas: res.data, tarefasOriginal: res.data})
      })
      .catch(error => this.setState({error: error}))
  }


  keyExtractor = (item, index) => index.toString()
  
  renderItem = ({ item }) => {
     return <ListItem
              title={`${item.nome}`}
            />
  }
  componentDidMount() {
    this.getTarefas()
  }
  render () {
    return (
    <ScrollView>
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
