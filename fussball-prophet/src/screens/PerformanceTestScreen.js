import React from 'react';
import {Text, View, Button, Alert} from 'react-native';
import {styles} from '../styles/GeneralStyles'

export default class PerformanceTestScreen extends React.Component{

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: 'Performance Test',
    };
  };

  render(){
    return (
      <View style={styles.container}>
      </View>
    );
  }
}
