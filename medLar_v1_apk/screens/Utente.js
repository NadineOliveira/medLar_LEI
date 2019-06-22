import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ListView,
  FlatList,
  ActivityIndicator,
  Image
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
  },
  TouchableOpacityStyle: {
    position: 'absolute',
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
    axios.get("http://192.168.1.67:8000/api/utentes/"+nr)
      .then(res => {
        this.setState({utente: res.data})
      })
      .catch(error => this.setState({error: error}))
  }
  
  getMedUtente = (nr) =>{
    axios.get("http://192.168.1.67:8000/api/slots/medicamentos/"+nr)
      .then(res => {
        this.setState({medsUtente: res.data})
      })
      .catch(error => this.setState({error: error}))
  }

  checkMedicamentoUtente = (med,nr) =>{
    
    console.warn("Need to add meds "+med+" to "+nr);
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
  componentDidMount() {
    this.getUtente(this.state.nr_processo)
    this.getMedUtente(this.state.nr_processo)
  }
  render () {
    
    const { utente } = this.props
    return (
    <View>
      {this.state.utente.genero === "M" ? (
        <ListItem
          title={`Sr. ${this.state.utente.nome} ${this.state.utente.apelido}`}
          subtitle={this.state.utente.contacto}
          leftAvatar={{source: require("../assets/images/maleIcon.png")}}
          rightIcon={<Text style={{color: 'green'}}>Editar</Text>} 
          button
          onPress={() => {this.goToUtente(this.state.utente.nr_processo)}}
        />
      ) : (
        <ListItem
          title={`D. ${this.state.utente.nome} ${this.state.utente.apelido}`}
          subtitle={this.state.utente.contacto}
          leftAvatar={{source: require("../assets/images/femaleIcon.png")}}
          rightIcon={<Text style={{color: 'green'}}>Editar</Text>} 
          button
          onPress={() => {this.goToUtente(this.state.utente.nr_processo)}}
        />
      )}
      <ScrollView>
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.medsUtente}
        renderItem={this.renderItem}
      />
      </ScrollView>
      <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={()=>this.props.navigation.navigate("MedicamentoAddUtenteNav")}
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
