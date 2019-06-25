import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Button, Image } from "react-native";
import {
    createStackNavigator,
} from "react-navigation";

import Auxiliares from '../screens/Admin/Auxiliares'
import AuxiliarAdd from "../screens/Admin/AuxiliarAdd";
import AuxiliarEdit from "../screens/Admin/AuxiliarEdit";
import TarefaAdd from "../screens/Admin/TarefaAdd";
import Icon from '@expo/vector-icons/Ionicons';

const AuxiliaresStack = createStackNavigator({
    AuxiliaresDashNavigator: Auxiliares,
    AuxiliaresDashNavigatorAdd: AuxiliarAdd,
    AuxiliaresDashNavigatorEdit: AuxiliarEdit,
    TarefaDashNavigatorAdd: TarefaAdd,
}, {
    initialRouteName: 'AuxiliaresDashNavigator',
    navigationOptions: {
        drawerIcon: (
            <Image 
                source={require('../assets/images/utentes.png')}
                style={{ height: 24, width: 24, marginLeft: 25}}
            />
      )},
    defaultNavigationOptions: ({ navigation }) => {
        return {
          title: 'Lista de Auxiliares',
    
          headerLeft: ( <
            Icon style = {
                { paddingLeft: 10 }
            }
            onPress = {
                () => navigation.openDrawer()
            }
            name = "md-menu"
            size = { 30 }
            />
        )
        };
    }
});



export default AuxiliaresStack;
