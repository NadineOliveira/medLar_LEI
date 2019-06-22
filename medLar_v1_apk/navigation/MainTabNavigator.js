import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Button, Image } from "react-native";
import {
    DrawerNavigator,
    DrawerItems,
    createStackNavigator,
    createBottomTabNavigator,
    createDrawerNavigator,
    createSwitchNavigator
} from "react-navigation";
import {Container, Content, Header, Body, Icon } from 'native-base'
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import Login from "../screens/login";
import Utentes from "../screens/Utentes";
import Utente from "../screens/Utente";
import Medicamentos from "../screens/Medicamentos";


import UtentesStack from './UtentesNavigator';
import MedicamentosStack from './MedicamentosNavigator';
import AddUtenteStack from './AddUtenteNavigator';
import TarefasStack from './TarefasNavigator';

import UtenteAddScreen from '../screens/UtenteAdd';
import { requireNativeViewManager } from 'expo-core';

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

const CustomDrawerContentComponent = (props) => (
    <Container>
        <Header style={{height: 250, backgroundColor: 'white'}}>
            <Body>
                <Image 
                    style={{height: 150, width: 150, borderRadius: 75}}
                    source={require('../assets/images/maleIcon.png')}
                />
                <Text>...@mail.com</Text>
            </Body>
        </Header>
        <Content>
            <DrawerItems {...props}/>
        </Content>
    </Container>
)

const AppDrawnNavigator = createDrawerNavigator({
    //Dashboard: { screen: DashboardStack },
    'Lista de Utentes': {screen: UtentesStack},
    'Lista de Medicamentos': {screen: MedicamentosStack},
    'Adicionar Utente': {screen: AddUtenteStack},
    'Lista de tarefas': {screen: TarefasStack}
    //'Adicionar Medicamento': {screen: AddMedicamentoStack}
}, {
    initialRouteName: 'Lista de Utentes',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
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