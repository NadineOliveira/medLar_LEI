import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Button } from "react-native";
import {
    createStackNavigator,
} from "react-navigation";

import Utentes from "../screens/Utentes";
import Utente from "../screens/Utente";

import Icon from '@expo/vector-icons/Ionicons';

const UtentesStack = createStackNavigator({
    UtentesDashNavigator: Utentes,
    UtenteDashNavigator: Utente,
}, {
    initialRouteName: 'UtentesDashNavigator',
    defaultNavigationOptions: ({ navigation }) => {
        return {
          title: 'Utentes',
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



export default UtentesStack;
/*
export default createBottomTabNavigator({
    HomeStack,
    LinksStack,
    SettingsStack
});*/