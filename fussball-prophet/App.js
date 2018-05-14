import React from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import GameDayCreationScreen from './src/screens/GameDayCreationScreen'

class HomeScreen extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <Button
            onPress={() => this.props.navigation.navigate('GameDayCreation')}
            title="Neuer Spieltag"
            accessibilityLabel="Erstelle einen neuen Spieltag"
        />
      </View>
    );
  }
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
