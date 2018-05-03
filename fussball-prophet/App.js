import React from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';

export default class App extends React.Component {
   _onCreateGameday = () => {
    Alert.alert(
      'Neuer Spieltag bitte!!',
      'You did it!',
    );
  }
  
  
  render() {
    return (
      <View style={styles.container}>
        <Button
            onPress={this._onCreateGameday}
            title="Neuer Spieltag"
            accessibilityLabel="Erstelle einen neuen Spieltag"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
