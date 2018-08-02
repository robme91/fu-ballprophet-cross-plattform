/*
TODO screen, der
  > eine season/ spieltags auswahl bietet
  > eine Liste aller Tippscheine (als player name) anzeigt
  > Button mit tippschein hinzufügen
    > öffnet modal, in dem ein tipticket ausgefüllt wird (season, spieltag wird übernommen)
    > beim öffnen also tipticket mit spieltag season anlegen
    > beim schließen des modals tipticket mit allen angegebenen daten in asyncstorage speichern
      # id des tiptickets ist, season-spieltag-player
    > name des spielers erscheint dann in liste
    > liste wird immer aktualisiert bei componentmount und beim schließen des modals (prüfen ob, componentMount auch aufgerufen wird nachdem modal schließt)
  > Export button, der alle tippscheine der liste formatiert in die zwischenablage kopiert
  > anklicken eines listen items muss das modal öffnen mit den eingaben
*/

import React from 'react';
import {Text, View, Button, Alert} from 'react-native';
import {styles} from '../styles/GeneralStyles';
import TipTicketModal from '../ui-components/TipTicketModal';
import GameDayPicker from '../ui-components/GameDayPicker'

export default class ManageTipsScreen extends React.Component{

  static navigationOptions = {
    title: 'Tipp Verwaltung',
  };

  constructor(props){
    super(props);
    this.state = {
      measurements: [],
      isOpen: false,
      selectedGameday: 1,
      selectedSeason: this.initSeason(),
    }
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

  handlePickerChange = (itemValue, itemIndex) => {
    this.setState({selectedGameday: itemValue});
  };

  handleOnSeasonChange = (text) => {
    this.setState({selectedSeason: text});
  };

  handleOnShowModal = () => {
    //console.log("Modal offen");
  }

  handleOnCloseModal = () => {
    //console.log("Modal closed");
  }

  openModal = (isVisible) => {
    this.setState({isOpen: isVisible});
  }

  render(){
    return(
      <View style={styles.container}>
        <GameDayPicker
          selectedGameday={this.state.selectedGameday}
          onChange={(itemVal, itemIdx) => this.handlePickerChange(itemVal, itemIdx)}
          season={this.state.selectedSeason}
          onChangeText={(text) => this.handleOnSeasonChange(text)}
        />
        <TipTicketModal
          onModalShow={() => this.handleOnShowModal()}
          onModalClose={() => this.handleOnCloseModal()}
          isOpen={this.state.isOpen}
          closeModal = {() => this.openModal(false)}
          />
        <Button
          title="Open Modal"
          onPress={() => this.openModal(true)}
          />
      </View>
    );
  }
}
