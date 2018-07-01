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

  constructor(props){
    super(props);
    this.state = {
      measurements: [],
    }
  }

  getTimeForRequest = (reqUrl) => {
    let t0 = Date.now();
    return fetch(reqUrl)
    .then((response) => {
      if (response.ok) {
        console.log("Response sucessfull");
      }
    })
    .then(() => {
      let t1 = Date.now()
      console.log("t0=" + t0 + "; t1=" + t1);
      this.addMeasureResult(t1-t0);
    })
    .catch((error) => {
      console.error("Error when perform request: " + error);
    });
  }

  addMeasureResult = (deltaT) =>{
    let updatedArr = this.state.measurements;
    updatedArr.push(deltaT);
    this.setState({measurements: updatedArr});
    console.log("Call to API took " + deltaT + " milliseconds.");
  }


  handleMultipleRequests = () => {
    const baseURL="https://www.openligadb.de/api/getmatchdata/bl1/";
    const apiEndpoint ="2017/32";
    const requestNumber = 20;
    console.log("Start sending requests to API with Parameters: ApiEndpoint=" + apiEndpoint +"; Number of Requests=" + requestNumber);
    let promises = [];
    for(i=0; i <= requestNumber; i++){
      reqPromise = this.getTimeForRequest(baseURL + apiEndpoint);
      promises.push(reqPromise);
    }
    Promise.all(promises).then(()=>{
      Alert.alert("Test abgeschlossen", "Alle Werte im State gespeichert.");
    });
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
