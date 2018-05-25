import React, { Component } from 'react';
import {TextInput, View, Text} from 'react-native';
import {styles} from '../styles/GeneralStyles'

export default class GameDayQuestion extends Component {

  constructor(props){
    super(props);
    this.state= {
      questionInCreation: true,
      question: null
    }
  }

  render(){
    const input = <TextInput style={styles.userInputs} />;
    const text = <Text>{this.state.question}</Text>
    const question = this.state.questionInCreation ? input : text;
    return(
      <View style={styles.container}>
        <Text>Spieltagsfrage</Text>
        {question}
      </View>
    );
  }
}
