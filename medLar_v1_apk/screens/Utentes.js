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
      error: null
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
        this.setState({utentes: res.data, utentesOriginal: res.data})
      })
      .catch(error => this.setState({error: error}))
  }
  
  goToMedicamentosUtente = (nr) =>{
    this.props.navigation.push('UtenteDashNavigator', {
      nr_processo: nr
    });
  }

  keyExtractor = (item, index) => index.toString()
  
  renderItem = ({ item }) => {
    if(item.genero === 'M') 
     return <ListItem
              title={`Sr. ${item.nome} ${item.apelido}`}
              subtitle={item.contacto}
              leftAvatar={{source: require("../assets/images/maleIcon.png")}}
              rightIcon={<Text style={{color: 'orange'}}>Ver</Text>} 
              button
              onPress={() => {this.goToMedicamentosUtente(item.nr_processo)}}
            />
    else  
     return <ListItem
             title={`D. ${item.nome} ${item.apelido}`}
             subtitle={item.contacto}
             leftAvatar={{source: require("../assets/images/femaleIcon.png")}}
             rightIcon={<Text style={{color: 'orange'}}>Ver</Text>} 
             button
             onPress={() => {this.goToMedicamentosUtente(item.nr_processo)}}
            />
  }
  componentDidMount() {
    this.getUsers()
  }
  render () {
    return (
    <ScrollView>
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
