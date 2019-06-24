import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Button, Image } from "react-native";
import {
    createStackNavigator,
} from "react-navigation";

import Tarefas from "../screens/Tarefas" 

import Icon from '@expo/vector-icons/Ionicons';
  


const TarefasStack = createStackNavigator({
    TarefasDashNavigator: Tarefas
}, {
    initialRouteName: 'TarefasDashNavigator',
    navigationOptions: {
        drawerIcon: (
            <Image 
                source={require('../assets/images/tasks.png')}
                style={{ height: 24, width: 24, marginLeft: 25}}
            />
      )},
    defaultNavigationOptions: ({ navigation }) => {
        return {
          title: 'Tarefas',
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



export default TarefasStack;
