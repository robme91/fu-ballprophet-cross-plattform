import React from 'react';
import {Text,ScrollView, View, Button, Picker, KeyboardAvoidingView} from 'react-native';
import {styles} from '../styles/GeneralStyles'
import GameComponent from '../ui-components/GameComponent'
import GameDayQuestion from '../ui-components/GameDayQuestion'

export default class GameDayCreationScreen extends React.Component{
  static navigationOptions = {
    title: 'Neuer Spieltag',
  };

  constructor(props){
    super(props);
    this.state = {
      selectedGameday: null,
    }
  }

  handlePickerChange = (itemValue, itemIndex) => {
    this.setState({selectedGameday: itemValue});
  };

  renderGameComponents() {
    let gameComps = [];
    for(i=1; i <= 9; i++){
      gameComps.push(<GameComponent key={i} number={i} scoreIsVisible="false"/>);
    }
    return gameComps;
  }

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
        <GameDayQuestion questionInCreation={true} style={{flex:2}}/>
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
