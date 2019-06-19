import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Button } from "react-native";
import {
    createStackNavigator,
    createBottomTabNavigator,
    createDrawerNavigator,
    createSwitchNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import Login from "../screens/login";
import Utentes from "../screens/Utentes";

import Icon from '@expo/vector-icons/Ionicons';

import UtentesStack from './UtentesNavigator';

const DashboardStack = createStackNavigator({
    DashboardTabNavigator: Utentes,
}, {
    defaultNavigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Utentes',
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


const AppDrawnNavigator = createDrawerNavigator({
    //Dashboard: { screen: DashboardStack },
    Utentes: {screen: UtentesStack}
});


const HomeStack = createSwitchNavigator({
    Login: { screen: Login },
    UtentesScreen: { screen: AppDrawnNavigator },
});


HomeStack.navigationOptions = {
    tabBarLabel: "Login",
    tabBarIcon: ({ focused }) => ( <
        TabBarIcon focused = { focused }
        name = {
            Platform.OS === "ios" ?
            `ios-information-circle${focused ? "" : "-outline"}` : "md-information-circle"
        }
        />
    )
};


export default HomeStack;
/*
export default createBottomTabNavigator({
    HomeStack,
    LinksStack,
    SettingsStack
});*/