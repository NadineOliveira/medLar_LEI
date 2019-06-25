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

const host = require("../../serverAddress")
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
    input: {
      margin: 5,
      height: 40,
      borderColor: '#808080',
      width:200,
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 15
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

class AuxiliaresScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      auxiliars: [],
      auxiliarsOriginal: [],
      error: null,
      update: false,
      refreshing: false,
    }
    this.getUsers = this.getUsers.bind(this);
  }

  updateSearch = (e) => {
    if(e==='') 
      this.setState({auxiliars: this.state.auxiliarsOriginal,search: ''})
    else {const newData = this.state.auxiliarsOriginal.filter(o => {
      return Object.keys(o).some(k => JSON.stringify(o[k]).toLowerCase().includes(e.toLowerCase()));
    });
    this.setState({auxiliars: newData, search: e});
    }
  };

  getUsers = () =>{
    axios.get(localhost+"/api/auxiliares/ativos")
      .then(res => {
        this.setState({auxiliars: res.data, auxiliarsOriginal: res.data, refreshing:false})
      })
      .catch(error => this.setState({error: error}))
  }
  
  goToInfoAuxiliar = (nr) =>{
    this.props.navigation.push('AuxiliaresDashNavigatorEdit', {
      id: nr
    });
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.componentWillMount()
  }

  keyExtractor = (item, index) => index.toString()
  
  renderItem = ({ item }) => {
     return <ListItem
              title={`Sr. ${item.nome} ${item.apelido}`}
              subtitle= {<Text>{'Contacto: '+item.contacto}</Text>}
              leftAvatar={{source: require("../../assets/images/maleIcon.png")}}
              rightIcon={<Text style={{color: 'green'}}>Ver</Text>} 
              button
              onPress={() => {this.goToInfoAuxiliar(item.id)}}
            />
  }
  componentWillMount() {
    this.getUsers()
  }

  render () {
    return (
        <View><View>
            <SearchBar
                placeholder="Escreva aqui..."
                onChangeText={e => this.updateSearch(e)} 
                value={this.state.search}
                lightTheme
                round
            />
    <ScrollView
        refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }>
            <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.auxiliars}
                renderItem={this.renderItem}
                />
            </ScrollView> 
        </View>
        <View>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={()=>this.props.navigation.navigate("AuxiliaresDashNavigatorAdd", {
                    id: this.state.id
                })}
                style={styles.TouchableOpacityStyle}>
                <Image
                    source={
                        require('../../assets/images/addSimple.png')
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
export default AuxiliaresScreen;
