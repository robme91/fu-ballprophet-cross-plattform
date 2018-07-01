import React from 'react';
import {Text, View, Button, Alert} from 'react-native';
import {styles} from '../styles/GeneralStyles'

export default class PerformanceTestScreen extends React.Component{

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: 'Performance Test',
    };
  };


  /*Measure performance https://developer.mozilla.org/en-US/docs/Web/API/Performance/now*/
  getTimeForRequest = (reqUrl) => {
    const present = require('present');
    let t0 = Date.now();
    fetch(reqUrl)
    .then((response) => {
      if (response.ok) {
        console.log(response.json());
      }
    })
    .catch((error) => {
      console.error("Error when perform request: " + error);
    });
    t1 = Date.now()
    console.log("t0=" + t0 + "; t1=" + t1);
    return t1-t0;
  }


  handleMultipleRequests = () => {
    const baseURL="https://www.openligadb.de/api/getmatchdata/bl1/";
    const apiEndpoint ="2017/32";
    const requestNumber = 20;
    console.log("Start sending requests to API with Parameters: ApiEndpoint=" + apiEndpoint +"; Number of Requests=" + requestNumber);
    deltaT = this.getTimeForRequest(baseURL + apiEndpoint);
    console.log("Call to API took" + deltaT + " milliseconds.");
    // for(i=0; i <= requestNumber; i++){
    //
    // }
  }

  render(){
    return (
      <View style={styles.container}>
        <Button
          title="Starte Mehrfachabfrage"
          onPress={() => this.handleMultipleRequests()}
        />
      </View>
    );
  }
}
