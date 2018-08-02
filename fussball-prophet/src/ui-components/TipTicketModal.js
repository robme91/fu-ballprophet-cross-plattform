import React, { Component } from 'react';
import {TextInput, View, Modal, Button, Text} from 'react-native';
import {styles} from '../styles/GeneralStyles';

export default class TipTicketModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      player: null,
      tips: null,
    };
  }

  initState = (props) => {
    if(props.chosenItem != null){
      if(props.chosenItem.player != null){
        this.setState({player: props.chosenItem.player});
      }else{
        this.setState({player: null});
      }
      if(props.chosenItem.tips != null){
        this.setState({tips: props.chosenItem.tips});
      }else{
        this.setState({tips: null});
      }
    }else{
      this.setState({player: null});
      this.setState({tips: null});
    }
  }

  render (){
    return (
      <Modal
        transparent={false}
        animationType={'none'}
        visible={this.props.isOpen}
        onShow={() => this.initState(this.props)}
        onRequestClose={() => this.props.onModalClose(this.state.player, this.state.tips)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.game}>
              <Text>Prophet: </Text>
              <TextInput
                style={styles.questionInput}
                onChangeText={(changedText) => {this.setState({player: changedText})}}
                value={this.state.player}
                />
            </View>
            <Text>Tippabgabe</Text>
            <TextInput
              style={styles.questionInput}
              multiline = {true}
              onChangeText={(changedText) => {this.setState({tips: changedText})}}
              value={this.state.tips}
              />
            <Button
              title="Tippschein schließen"
              onPress={() => this.props.onModalClose(this.state.player, this.state.tips)}
              />
            <View style={{ height: 60 }} />
          </View>
      </Modal>
    );
  }

}
