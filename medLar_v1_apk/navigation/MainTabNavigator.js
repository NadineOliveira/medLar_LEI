import React, { Component } from 'react';
import { Platform } from "react-native";
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
/*
const HomeStack = createStackNavigator({
    Login: { screen: Login },
    UtentesScreen: { screen: AppDrawnNavigator /*Utentes }
});*/

class Feed extends Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Feed</Text>
        </View>
      );
    }
  }
  
  class Settings extends Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Settings</Text>
        </View>
      );
    }
  }
  
  class Profile extends Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Profile</Text>
        </View>
      );
    }
  }
  
  const DashboardTabNavigator = createBottomTabNavigator(
    {
      Feed,
      Profile,
      Settings
    },
    {
      navigationOptions: ({ navigation }) => {
        const { routeName } = navigation.state.routes[navigation.state.index];
        return {
          headerTitle: routeName
        };
      }
    }
  );


const DashboardStack = createStackNavigator({
    DashboardTabNavigator: DashboardTabNavigator
}, {
    defaultNavigationOptions: ({ navigation }) => {
        return {
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
    Dashboard: { screen: DashboardStack }
});


const HomeStack = createSwitchNavigator({
    Login: { screen: Login },
    UtentesScreen: { screen: AppDrawnNavigator },
    Utentes: {screen: Utentes},
});

export default HomeStack;

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

const LinksStack = createStackNavigator({
    Links: LinksScreen
});

LinksStack.navigationOptions = {
    tabBarLabel: "Links",
    tabBarIcon: ({ focused }) => ( <
        TabBarIcon focused = { focused }
        name = { Platform.OS === "ios" ? "ios-link" : "md-link" }
        />
    )
};

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
    tabBarLabel: "Settings",
    tabBarIcon: ({ focused }) => ( <
        TabBarIcon focused = { focused }
        name = { Platform.OS === "ios" ? "ios-options" : "md-options" }
        />
    )
};

const AppBottomNavigator = createBottomTabNavigator({
    HomeStack,
    LinksStack,
    SettingsStack
});
/*
export default createBottomTabNavigator({
    HomeStack,
    LinksStack,
    SettingsStack
});*/