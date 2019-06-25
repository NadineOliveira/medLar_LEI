import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ListView,
  FlatList,
  
  Image
} from "react-native";
import { SearchBar , ListItem, Icon, Button } from 'react-native-elements'
import axios from "axios";
import { Item } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

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
    marginTop: 10,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    elevation: 3,
    backgroundColor: 'orange',
    borderRadius: 25
  },

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
    axios.get(localhost+"/api/medicamentos/")
      .then(res => {
        this.setState({medicamentos: res.data, medicamentosOriginal: res.data})
      })
      .catch(error => this.setState({error: error}))
  }
  
  goToMedicamentosUtente = (nr) =>{
    this.props.navigation.navigate('MedicamentoEdit', {
      id_med: nr
    });
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
    <View>
        <SearchBar 
          placeholder="Escreva aqui..."
          onChangeText={e => this.updateSearch(e)} 
          value={this.state.search}
          containerStyle={{borderColor: "white"}}
          lightTheme
          round
        />
        <ScrollView>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.medicamentos}
            renderItem={this.renderItem}
          />
        </ScrollView>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={()=>this.props.navigation.navigate("MedicamentoAdd")}
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
            />
        </TouchableOpacity>
      </View>
    </View>
    )
  }
}
export default MedicamentosScreen;
