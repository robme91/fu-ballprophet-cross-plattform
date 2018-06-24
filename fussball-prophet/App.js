import React from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import GameDayCreationScreen from './src/screens/GameDayCreationScreen'
import HomeScreen from './src/screens/HomeScreen'
import PerformanceTestScreen from './src/screens/PerformanceTestScreen'

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    GameDayCreation: GameDayCreationScreen,
    PerformanceTest: PerformanceTestScreen
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
