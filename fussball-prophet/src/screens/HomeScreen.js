import React from 'react';
import {Text, View, Button, Alert} from 'react-native';
import {styles} from '../styles/GeneralStyles';

export default class HomeScreen extends React.Component{

  static navigationOptions = {
    title: 'Fußball Prophet',
  };

  render(){
    return (
      <View style={styles.container}>
        <Button
            onPress={() => this.props.navigation.navigate('GameDayCreation')}
            title="Neuer Spieltag"
            accessibilityLabel="Erstelle einen neuen Spieltag"
        />
        <View style={{ height: 20 }} />
        <Button
            onPress={() => this.props.navigation.navigate('ManageTips')}
            title="Manage Spieler Tipps"
            accessibilityLabel="Manage Spieler Tipps"
        />
        <View style={{ height: 20 }} />
        <Button
            onPress={() => this.props.navigation.navigate('PerformanceTest')}
            title="Perfomance Test"
            accessibilityLabel="Gehe zu Performance Test Seite"
        />
      </View>
    );
  }
}
