import React from 'react';
import {TextInput, View, Picker} from 'react-native';
import {styles} from '../styles/GeneralStyles';

/*This component is a picker for the 34 game days*/
export default class GameDayPicker extends React.Component{

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
