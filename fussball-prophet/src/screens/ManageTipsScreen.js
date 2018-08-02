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
import {Text, View, Button, Alert, FlatList} from 'react-native';
import {styles} from '../styles/GeneralStyles';
import TipTicketModal from '../ui-components/TipTicketModal';
import GameDayPicker from '../ui-components/GameDayPicker'
import TipTicket from '../entities/TipTicket'

export default class ManageTipsScreen extends React.Component{

  static navigationOptions = {
    title: 'Tipp Verwaltung',
  };

  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      selectedGameday: 1,
      selectedSeason: this.initSeason(),
      tipTickets: [],
      chosenListItem: null,
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

  handleOnCloseModal = (playerName, tips) => {
    this.setState({chosenListItem: null});
    this.openModal(false)
    if(playerName != null){
      tipTicket = new TipTicket(this.state.selectedGameday, this.state.selectedSeason, playerName, tips);
      updatedTickets = this.state.tipTickets;
      isIndex = updatedTickets.findIndex((element) => {
          return element.player === playerName;
      })
      if(isIndex < 0){    // if there is no index, the element does nozt exist in list
        updatedTickets.push(tipTicket);
      }else{
        updatedTickets[isIndex] = tipTicket;
      }
      this.setState({tipTickets: updatedTickets});
    }
  }

  openModal = (isVisible) => {
    this.setState({isOpen: isVisible});
  }

  openModalWithValues = (clickedItem) =>{
    this.setState({chosenListItem: clickedItem});
    console.log("clicked item: " + clickedItem.player);
    this.openModal(true);
  }

  handleLongPressOnItem = (clickedItem) =>{
    updatedTickets = this.state.tipTickets;
    let index = updatedTickets.indexOf(clickedItem);
    if (index > -1) {
      updatedTickets.splice(index, 1);
      this.setState({tipTickets: updatedTickets});
    }
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
          onModalClose={(playerName, tips) => this.handleOnCloseModal(playerName, tips)}
          isOpen={this.state.isOpen}
          chosenItem = {this.state.chosenListItem}
          />
        <Button
          title="Tippschein anlegen"
          onPress={() => this.openModal(true)}
          />
        <View style={{ height: 30 }} />
        <Text>Tippscheine</Text>
        <FlatList
          data = {this.state.tipTickets}
          renderItem = {
            ({item}) => <Text
                onPress = {() => this.openModalWithValues(item)}
                onLongPress = {() => this.handleLongPressOnItem(item)}
                style={styles.listItem}>
                {item.player}
              </Text>
          }
          extraData={this.state}
          keyExtractor={(item) => item.player}
        />
      <View style={{ height: 60 }} />
      </View>
    );
  }
}
