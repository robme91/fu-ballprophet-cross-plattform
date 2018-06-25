import React from 'react';
import {Text, TextInput, ScrollView, View, Button, Picker, KeyboardAvoidingView, Clipboard, Alert} from 'react-native';
import {styles} from '../styles/GeneralStyles';
import GameComponent from '../ui-components/GameComponent';
import GameDayQuestion from '../ui-components/GameDayQuestion';
import Game from '../entities/GameClass';
import GameDay from '../entities/GameDayClass';

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
      selectedSeason: this.initSeason(),
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

  /* Initialises the season with the current year or the year before.
   The season year for an openLigaDb call is in a season 2018/19 --> 2018.
   Thats why i check here which month we got. Between July and December,
   the default season is the current year. Between January and June, the default
   season is the current year - 1.
   */
  initSeason = () =>{
    let currentDate = new Date();
    if(currentDate.getMonth() > 5){
      return currentDate.getFullYear().toString();
    }
    return (currentDate.getFullYear() - 1).toString();
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
    let formGameDayNumber = 'Spieltag Nr. ' + this.state.selectedGameday + '\n\n';
    let formGames = this.formatGames();
    let formQuestion = 'Spieltagsfrage: \n' + this.state.gameDayQuestion;
    Clipboard.setString(formGameDayNumber + formGames + formQuestion);
    let gameDay = new GameDay(this.state.selectedGameday);
    let gamesArr = this.state.games;
    gameDay.games = gamesArr;
    gameDay.question = this.state.gameDayQuestion;
    gameDayJson = JSON.stringify(gameDay);
    console.log(gameDayJson);
    parsedGameDay = JSON.parse(gameDayJson);
    console.log("Frage: " + parsedGameDay.question);
    Alert.alert("Copied to Clipboard", "Spieltag in der Zwischenablage kopiert");
  };

  formatGames = () => {
    let gamesString = '';
    let gamesArr = this.state.games;
    for(i=0; i <= gamesArr.length - 1; i++){
      let game = gamesArr[i];
      let homeTeam = game.homeTeam ? game.homeTeam : "Team fehlt";
      let awayTeam = game.awayTeam ? game.awayTeam : "Team fehlt";
      gamesString += homeTeam + ' - ' + awayTeam + '\n';
    }
    return gamesString + '\n';
  }

  handlePickerChange = (itemValue, itemIndex) => {
    this.setState({selectedGameday: itemValue});
  };

  handleOnSeasonChange = (text) => {
    this.setState({selectedSeason: text});
  };

  handleQuestionChangeText = (newText) => {
    this.setState({gameDayQuestion: newText});
  };

  handleLoadingGames = () => {
    console.log("Start laoding games");
     //TODO while loading, make a react native loading ActivityIndicator here
     const basisURL = 'https://www.openligadb.de/api/getmatchdata/bl1/';
     const season = this.state.selectedSeason + '/';
     const gameDayNumber = this.state.selectedGameday;
     fetch(basisURL + season + gameDayNumber)
     .then((response) => response.json())
     .then((responseJson) => {
       let loadedGames = responseJson.map((game, index) => {
         let convertedGame = new Game(index + 1);
         convertedGame.homeTeam = game.Team1.TeamName;
         convertedGame.awayTeam = game.Team2.TeamName;
         return convertedGame;
       });
       if(loadedGames.length > 0){
         this.setState({games: loadedGames});
       }else{
         Alert.alert("Keine Daten", "Es konnten keine Spiele zum angegebenen Spieltag gefunden werden. Prüfen ob Spieltagsnummer und Jahreszahl stimmen.");
       }
     })
     .catch((error) => {
       console.error(error);
       Alert.alert("Fehler", "Spiele konnten nicht geladen werden. Entweder manuell oder später nochmal probieren.");
     });
  };

  render(){
    return (
      <KeyboardAvoidingView  style={styles.container} behavior="padding">
        <GameDayPicker
          selectedGameday={this.state.selectedGameday}
          onChange={(itemVal, itemIdx) => this.handlePickerChange(itemVal, itemIdx)}
          season={this.state.selectedSeason}
          onChangeText={(text) => this.handleOnSeasonChange(text)}
        />
        <Button
          title="Lade Spiele"
          onPress={() => this.handleLoadingGames()}
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
      <View style={styles.gameDayPickerContainer}>
        <Picker
          selectedValue={this.props.selectedGameday}
          style={{ height: 50, width: 150}}
          onValueChange={(itemValue, itemIndex) => this.props.onChange(itemValue, itemIndex)}
        >
          {this.renderPickerItem()}
        </Picker>
        <TextInput
          onChangeText={(text) => this.props.onChangeText(text)}
          value={this.props.season}
          maxLength={4}
          keyboardType='numeric'
          style={{width: 50, height: 40}}
        />
      </View>
    );
  }
}
