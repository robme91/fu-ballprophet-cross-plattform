import React from 'react';
import {Text, View, Button, Picker} from 'react-native';
import {styles} from '../styles/GeneralStyles'

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
    console.log("Item: " + itemValue + " an der Stelle " + itemIndex);
  };

  render(){
    return (
      <View style={styles.container}>
        <GameDayPicker
          selectedGameday={this.state.selectedGameday}
          onChange={(itemVal, itemIdx) => this.handlePickerChange(itemVal, itemIdx)}
        />
      </View>
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
