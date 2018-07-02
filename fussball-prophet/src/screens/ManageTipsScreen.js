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

export default class ManageTipsScreen extends React.Component{

  static navigationOptions = {
    title: 'Tipp Übersicht',
  };

  constructor(props){
    super(props);
    this.state = {
      measurements: [],
      isOpen: false,
    }
  }

  handleOnShowModal = () => {
    console.log("Modal offen");
  }

  handleOnCloseModal = () => {
    this.setState({isOpen: false});
    console.log("Modal closed");
  }

  openModal = () => {
    //this.setState({isOpen: true});
    //TODO fix errors
  }

  render(){
    return(
      <View style={styles.container}>
        <TipTicketModal
          onModalShow={() => this.handleOnShowModal()}
          onModalClose={() => this.handleOnCloseModal()}
          isOpen={this.state.isOpen}
          />
          <Button
            title="Open Modal"
            onPress={() => this.openModal()}
            />
      </View>
    );
  }
}
