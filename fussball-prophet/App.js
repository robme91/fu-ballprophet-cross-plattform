import React from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import GameDayCreationScreen from './src/screens/GameDayCreationScreen'
import HomeScreen from './src/screens/HomeScreen'


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    GameDayCreation: GameDayCreationScreen
  },
  {
    initialRouteName: 'Home'
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
