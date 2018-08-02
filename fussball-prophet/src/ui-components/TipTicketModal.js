import React, { Component } from 'react';
import {TextInput, View, Modal, Button} from 'react-native';
import {styles} from '../styles/GeneralStyles';

export default class TipTicketModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      player: null,
      tips: null,
      answer: null,
    };
   this.initState(props);
  }

//TODO check if this method is needed or if e.g. palyer = props.player in constructor is also possible and if props is empty, it is just not filled
  initState = (props) => {
    if(props.player){
      this.setState({player: props.player});
    }
    if(props.tips){
      this.setState({tips: props.tips});
    }
    if(props.answer){
      this.setState({answer: props.answer});
    }
  }


  render (){
    return (
      <Modal
        transparent={false}
        animationType={'none'}
        visible={this.props.isOpen}
        onShow={() => this.props.onModalShow()}
        onRequestClose={() => this.props.onModalClose()}
        >
          <View style={styles.modalBackground}>
            <TextInput
              style={styles.userInputs}
              onChangeText={(changedText) => {this.setState({player: changedText})}}
              value={this.state.player}
              />
            <Button
              title="Close Modal"
              onPress={() => this.props.closeModal()}
              />
          </View>
      </Modal>
    );
  }

}
