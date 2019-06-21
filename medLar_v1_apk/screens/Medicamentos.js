import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ListView,
  FlatList,
  Button
} from "react-native";
import { SearchBar , ListItem } from 'react-native-elements'
import axios from "axios";
import { Item } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

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

class MedicamentosScreen extends Component {
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
      this.setState({medicamentos: this.state.medicamentosOriginal,search: ''})
    else {const newData = this.state.medicamentosOriginal.filter(o => {
      return Object.keys(o).some(k => JSON.stringify(o[k]).toLowerCase().includes(e.toLowerCase()));
    });
    this.setState({medicamentos: newData, search: e});
    }
  };

  getUsers = () =>{
    axios.get("http://192.168.1.7:8000/api/medicamentos/")
      .then(res => {
        this.setState({medicamentos: res.data, medicamentosOriginal: res.data})
      })
      .catch(error => this.setState({error: error}))
  }
  
  goToMedicamentosUtente = (nr) =>{
    console.warn('NR--> '+nr)
  }

  keyExtractor = (item, index) => index.toString()
  
  renderItem = ({ item }) => {
     return <ListItem
             title={item.nome}
             subtitle={item.lab}
             rightIcon={<Text>{item.quantidade} qt. <Text style={{fontSize: 20,color: "orange"}}>></Text></Text>} 
             button
             onPress={() => {this.goToMedicamentosUtente(item.id_med)}}
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
        containerStyle={{borderColor: "white"}}
        lightTheme
        round
      />
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.medicamentos}
        renderItem={this.renderItem}
      />
      <Button
        color='grey'
        title='Adicionar'
        onPress={()=>
        this.props.navigation.navigate("MedicamentoAdd")
        }
      />
      </ScrollView> 
    )
  }
}
export default MedicamentosScreen;
