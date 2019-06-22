import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Button } from "react-native";
import {
    createStackNavigator,
} from "react-navigation";

import Tarefas from "../screens/Tarefas" 

import Icon from '@expo/vector-icons/Ionicons';
  


const TarefasStack = createStackNavigator({
    TarefasDashNavigator: Tarefas
}, {
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
