import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Button, Image } from "react-native";
import {
    createStackNavigator,
} from "react-navigation";

import Medicamentos from "../screens/Medicamentos";

import MedicamentoAdd from "../screens/MedicamentoAdd"

import Icon from '@expo/vector-icons/Ionicons';
  


const MedicamentosStack = createStackNavigator({
    MedicamentosDashNavigator: Medicamentos,
    MedicamentoAdd: MedicamentoAdd
}, {
    initialRouteName: 'MedicamentosDashNavigator',
    navigationOptions: {
        drawerIcon: (
            <Image 
                source={require('../assets/images/meds.png')}
                style={{ height: 24, width: 24, marginLeft: 25}}
            />
      )},
    defaultNavigationOptions: ({ navigation }) => {
        return {
          title: 'Lista de Medicamentos',
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



export default MedicamentosStack;
/*
export default createBottomTabNavigator({
    HomeStack,
    LinksStack,
    SettingsStack
});*/