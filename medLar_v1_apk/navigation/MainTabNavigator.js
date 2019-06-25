import React, { Component } from 'react';
import { Platform, View, Text, AsyncStorage,Button, Image } from "react-native";
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
import Login from "../screens/login";
import Utentes from "../screens/Utentes";


import UtentesStack from './UtentesNavigator';
import MedicamentosStack from './MedicamentosNavigator';
import AddUtenteStack from './AddUtenteNavigator';
import TarefasStack from './TarefasNavigator';
import AuxiliaresStack from './AuxiliaresNavigator';

import UtenteAddScreen from '../screens/UtenteAdd';
import { requireNativeViewManager } from 'expo-core';


getUsername=async()=>{
    var result='';
    await AsyncStorage.getItem('username')
    .then((value) => {
    result = value;
    }).catch(err=> result = err);
    return result
}

const CustomDrawerContentComponent = (props) => (
    <Container>
        <Header style={{height: 250, backgroundColor: 'white'}}>
            <Body>
                <Image 
                    style={{height: 150, width: 150, borderRadius: 75}}
                    source={require('../assets/images/maleIcon.png')}
                />
                <Text>{(props.navigation.state.params.nome) + " "+
                        (props.navigation.state.params.apelido)}</Text>
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
    'Lista de tarefas': {screen: TarefasStack},
    'Logout': {screen: Login}
    //'Adicionar Medicamento': {screen: AddMedicamentoStack}
}, {
    initialRouteName: 'Lista de Utentes',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
});

const AppDrawnNavigator2 = createDrawerNavigator({
    //Dashboard: { screen: DashboardStack },
    'Lista de Utentes': {screen: UtentesStack},
    'Lista de Medicamentos': {screen: MedicamentosStack},
    'Adicionar Utente': {screen: AddUtenteStack},
    'Lista de tarefas': {screen: TarefasStack},
    'Lista de Auxiliares': {screen: AuxiliaresStack},
    'Logout': {screen: Login},
    //'Adicionar Medicamento': {screen: AddMedicamentoStack}
}, {
    initialRouteName: 'Lista de Auxiliares',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
});

const HomeStack = createSwitchNavigator({
    Login: { screen: Login },
    UtentesScreen: { screen: AppDrawnNavigator },
    AdminScreen: {screen: AppDrawnNavigator2}
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