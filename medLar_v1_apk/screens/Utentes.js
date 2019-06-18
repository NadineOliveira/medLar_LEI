import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ListView,
  FlatList
} from "react-native";
import axios from "axios";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

class UtentesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      utentesLista: [],
      text: "",
      loading: true
    };
  }

  async getUtentes() {
    console.warn(this.state);
    var utentesLista;
    var res = await axios.get("http://192.168.1.17:8000/api/utentes/ativos", {
      /*nr_processo: this.nr_processo,
      nome: this.nome,
      apelido: this.apelido*/
    });
    utentesLista = res.data.map(ut => {
      return { nr_processo: ut.nr_processo, nome: ut.nome };
    });
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.setState({
      loading: false,
      ds: ds.cloneWithRows(utentesLista),
      utentesLista: utentesLista
    });
    console.log("RESSSS:" + JSON.stringify(this.state.utentesLista));
    return utentesLista;
  }

  componentDidMount() {
    console.warn(this.state);
    this.getUtentes();
  }
  _renderRowData(data) {
    return <Text>{JSON.stringify(data)}</Text>;
  }
  render() {
    //console.log(this.state.utentesLista);
    console.log("render");
    const dataSource = this.state.ds.cloneWithRows(this.state.utentesLista);
    return (
      //var utentes = this.getUtentes();
      <View style={styles.container}>
        <ListView
          dataSource={dataSource}
          enableEmptySections={true}
          renderRow={rowData => this._renderRowData(rowData)}
        />
      </View>
    );
  }
}
export default UtentesScreen;
