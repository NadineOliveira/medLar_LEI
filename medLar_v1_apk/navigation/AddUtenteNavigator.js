import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Button, Image } from "react-native";
import {
    createStackNavigator,
} from "react-navigation";

import UtenteAdd from "../screens/UtenteAdd";

import Icon from '@expo/vector-icons/Ionicons';
  


const AddUtenteStack = createStackNavigator({
    UtenteAddDashNavigator: UtenteAdd
}, {
    initialRouteName: 'UtenteAddDashNavigator',
    navigationOptions: {
        drawerIcon: (
            <Image 
                source={require('../assets/images/utentesAdd.png')}
                style={{ height: 24, width: 24, marginLeft: 25}}
            />
    )},
    defaultNavigationOptions: ({ navigation }) => {
        return {
          title: 'Adicionar Utente',
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



export default AddUtenteStack;
/*
export default createBottomTabNavigator({
    HomeStack,
    LinksStack,
    SettingsStack
});*/