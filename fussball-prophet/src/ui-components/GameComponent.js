import React, { Component } from 'react';
import {TextInput, View, Text} from 'react-native';
import {styles} from '../styles/GeneralStyles'

export default class GameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: props.number,           // every gameday has 9 games, so each game gets a unique number per gameday between 1 and 9
      homeTeam: null,
      awayTeam: null,
      score: {
        homeScore: null,
        awayScore: null
      },
      scoreIsVisible: false
    };
  }

  render() {
    const scoreComp = this.state.scoreIsVisible ? <ScoreComponent/> : null;
    return (
      <View style={styles.game}>
        <Text>{this.state.number + '. '}</Text>
        <TextInput
          style={styles.userInputs}
          onChangeText={(text) => this.setState({homeTeam: text})}
          value={this.state.homeTeam}
        />
        <Text style={{fontWeight: 'bold'}}> : </Text>
        <TextInput
          style={styles.userInputs}
          onChangeText={(text) => this.setState({awayTeam: text})}
          value={this.state.awayTeam}
        />
        {scoreComp}
      </View>
    );
  }
}


class ScoreComponent extends Component{
  render() {
    return (
      <View style={styles.game}>
        <TextInput style={styles.userInputs}/>
        <Text style={{fontWeight: 'bold'}}>:</Text>
        <TextInput style={styles.userInputs}/>
      </View>
    );
  }
}
