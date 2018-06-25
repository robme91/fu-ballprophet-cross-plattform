import React from 'react';
import {Text, TextInput, ScrollView, View, Button, Picker, KeyboardAvoidingView, Clipboard, Alert, AsyncStorage} from 'react-native';
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

  //TODO also load data on didMount because, it can be also the first gameday that is needed
  componentDidMount = () => {
    this.loadSavedGameDay(this.state.selectedSeason + '_' + this.state.selectedGameday);
  }

  /*This method is a react lifecycle method that is called before a component is destroyed and unmounted
    If there is a need to save data on close or putting app to background then follow these steps
     https://stackoverflow.com/questions/38962034/how-to-detect-when-a-react-native-app-is-closed-not-suspended
     There is described how to access the appState and put listeners to it.
  */
  componentWillUnmount = () => {
    //currently saves data also when errors occurs and games are null or something like that, so reload for 1. gameday will bring just nulls
    let gameDay = new GameDay(this.state.selectedGameday);
    let gamesArr = this.state.games;
    gameDay.games = gamesArr;
    gameDay.question = this.state.gameDayQuestion;
    let gameDayJson = JSON.stringify(gameDay);
    let savingKey = this.state.selectedSeason + '_' + this.state.selectedGameday;
    try {
      AsyncStorage.setItem(savingKey, gameDayJson);
      console.log("Saved GameDay: " + gameDayJson);
    } catch (error) {
      console.log(error);
    }
  }

  loadSavedGameDay = (key) => {
    try {
      console.log("Get data key: " + key);
      AsyncStorage.getItem(key).then((gameDayJson) => {
        console.log(gameDayJson);
        if (gameDayJson !== null){
          const parsedGameDay = JSON.parse(gameDayJson);
          this.setState({games: parsedGameDay.games});
          console.log("Spieltagsfrage from database: " + parsedGameDay.question);
          this.setState({gameDayQuestion: parsedGameDay.question});
        }
      }).done();
    } catch (error) {
      console.log(error);
    }
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
    this.loadSavedGameDay(this.state.selectedSeason + '_' + itemValue);
  };

  handleOnSeasonChange = (text) => {
    this.setState({selectedSeason: text});
    this.loadSavedGameDay(text + '_' + this.state.selectedGameday);
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
