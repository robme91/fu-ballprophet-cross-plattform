import React from 'react';
import {Text,ScrollView, View, Button, Picker, KeyboardAvoidingView} from 'react-native';
import {styles} from '../styles/GeneralStyles';
import GameComponent from '../ui-components/GameComponent';
import GameDayQuestion from '../ui-components/GameDayQuestion';
import Game from '../entities/GameClass';

export default class GameDayCreationScreen extends React.Component{
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: 'Neuer Spieltag',
      headerRight: (
        <Button
          onPress={params.fetchGameDayData}
          title="Export"
         />
      )
    };
  };

  constructor(props){
    super(props);
    this.state = {
      selectedGameday: 1,
      games: this.initGames(),
      gameDayQuestion: ''
    }
    /*react navigation doesn't have a good pattern for passing data between header and component. so this param must be set here. */
    this.props.navigation.setParams({fetchGameDayData: this._fetchGameDayData });
  }

  initGames = () => {
    let gamesArr = [];
    for(i=1; i <= 9; i++){
      gamesArr.push(new Game(i));
    }
    return gamesArr;
  }

  renderGameComponents() {
    let gameComps = [];
    for(i=1; i <= 9; i++){
      let gameProp = this.state.games[i-1];
      gameComps.push(<GameComponent
        key={i}
        game={gameProp}
        onUpdateHomeTeam={(text, number) => this.updateHomeTeam(text, number)}
        onUpdateAwayTeam={(text, number) => this.updateAwayTeam(text, number)}
        scoreIsVisible="false"/>);
    }
    return gameComps;
  }

  updateHomeTeam = (team, number) => {
    let updateGames = this.state.games;
    let updateGame = updateGames[number - 1]
    updateGame.homeTeam = team;
    updateGames [number - 1] = updateGame;
    this.setState({games: updateGames});
  };

  updateAwayTeam = (team, number) => {
    let updateGames = this.state.games;
    let updateGame = updateGames[number - 1]
    updateGame.awayTeam = team;
    updateGames [number - 1] = updateGame;
    this.setState({games: updateGames});
  };

  _fetchGameDayData = () => {
    alert(this.state.selectedGameday + ", " + this.state.gameDayQuestion + ", " + this.state.games[0].homeTeam);
  };

  handlePickerChange = (itemValue, itemIndex) => {
    this.setState({selectedGameday: itemValue});
  };

  handleQuestionChangeText = (newText) => {
    this.setState({gameDayQuestion: newText});
  };

  render(){
    return (
      <KeyboardAvoidingView  style={styles.container} behavior="padding">
        <GameDayPicker
          selectedGameday={this.state.selectedGameday}
          onChange={(itemVal, itemIdx) => this.handlePickerChange(itemVal, itemIdx)}
        />
        <ScrollView style={{flex:1}} horizontal>
          <ScrollView>
            {this.renderGameComponents()}
          </ScrollView>
        </ScrollView>
        <GameDayQuestion
          questionInCreation={true}
          content={this.state.gameDayQuestion}
          onChangeText={(newText) => this.handleQuestionChangeText(newText)}
          style={{flex:2}}
        />
          {/*This view must be here because of those sucking keyboard problems on android*/}
        <View style={{ height: 60 }} />
      </KeyboardAvoidingView >
    );
  }
}

/*This component is a picker for the 34 game days*/
class GameDayPicker extends React.Component{

  renderPickerItem(){
    let gameDays = [];
    for(i=1; i < 35; i++){
      gameDays.push(<Picker.Item key={i} label={i + ". Spieltag"} value={i} />);
    }
    return gameDays;
  }

  render(){
    return (
      <Picker
        selectedValue={this.props.selectedGameday}
        style={{ height: 50, width: 150}}
        onValueChange={(itemValue, itemIndex) => this.props.onChange(itemValue, itemIndex)}
      >
        {this.renderPickerItem()}
      </Picker>
    );
  }
}
