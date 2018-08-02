import React, { Component } from 'react';
import {TextInput, View, Text} from 'react-native';
import {styles} from '../styles/GeneralStyles';
import Game from '../entities/GameClass';

export default class GameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreIsVisible: false
    };
  }

  render() {
    const scoreComp = this.state.scoreIsVisible ? <ScoreComponent /> : null;
    const gameNumber = this.props.game.number;
    return (
      <View style={styles.game}>
        <Text>{gameNumber + '. '}</Text>
        {/*Home team text input */}
        <TextInput
          style={styles.userInputs}
          onChangeText={(text) => this.props.onUpdateHomeTeam(text, gameNumber)}
          value={this.props.game.homeTeam}
        />
      {/*Wenn returntype (returnKeyType="next") doch noch auf weiter gehen soll, dann mach das hier https://medium.com/reactnative/tabbing-through-input-fields-ef283f923ab1*/}
        <Text style={{fontWeight: 'bold'}}> : </Text>
        {/*away team text input*/}
        <TextInput
          style={styles.userInputs}
          onChangeText={(text) => this.props.onUpdateAwayTeam(text, gameNumber)}
          value={this.props.game.awayTeam}
        />
        {scoreComp}
      </View>
    );
  }
}


class ScoreComponent extends Component{
  //TODO hier fehlen noch die onChangeText methoden in den inputs, so dass die scores in den state geschrieben werden.
  render() {
    return (
      <View style={styles.game}>
        <TextInput
          style={styles.scoreInputs}
          />
        <Text style={{fontWeight: 'bold'}}>:</Text>
        <TextInput style={styles.scoreInputs}/>
      </View>
    );
  }
}
