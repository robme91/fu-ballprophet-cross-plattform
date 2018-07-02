import React from 'react';
import {Text, View, Button, Alert, Clipboard} from 'react-native';
import {styles} from '../styles/GeneralStyles'
import Loader from '../ui-components/Loader';
import MeasuredSeries from '../entities/MeasuredSeries';

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
      loading: false,
    }
  }

  getTimeForRequest = (reqUrl, reqNumber, measuredSeries) => {
    const t0 = Date.now();
    return fetch(reqUrl)
    .then((response) => {
      if (response.ok) {
        let t1 = Date.now();
        console.log("Response sucessfull");
        console.log("t0=" + t0 + "; t1=" + t1);
        this.addMeasureResult(t1-t0, reqNumber, measuredSeries);
      }
    })
    .catch((error) => {
      console.error("Error when perform request: " + error);
    });
  }

  addMeasureResult = (deltaT, reqNumber, measuredSeries) =>{
    measuredSeries.addMeasurement(deltaT, reqNumber);
  }


  handleMultipleRequests = () => {
    this.setState({loading: true}); // start activity loader
    const baseURL="https://www.openligadb.de/api/getmatchdata/bl1/";
    const apiEndpoint ="2017/32";
    const requestNumber = 50;
    let series = new MeasuredSeries();
    series.apiEndpoint = apiEndpoint;
    series.requestNumber = requestNumber;
    console.log("Start sending requests to API with Parameters: ApiEndpoint=" + apiEndpoint +"; Number of Requests=" + requestNumber);
    let promises = [];
    for(i=0; i <= requestNumber; i++){
      reqPromise = this.getTimeForRequest(baseURL + apiEndpoint, i, series);
      promises.push(reqPromise);
    }
    Promise.all(promises).then(()=>{
      let updatedArr = this.state.measurements;
      updatedArr.push(series);
      this.setState({measurements: updatedArr});
      this.setState({loading: false});
      Alert.alert("Test abgeschlossen", "Alle Werte im State gespeichert.");
    });
  }

  copyMeasurementsToClipboard = () => {
    let content = "";
    this.state.measurements.forEach((series) => {
      content += series.toString() + '\n';
    });
    Clipboard.setString(content);
    Alert.alert("Copied to Clipboard", "Messergebnisse in die Zwischenablage kopiert.");
  }

  render(){
    return (
      <View style={styles.container}>
        <Loader
          loading={this.state.loading}
        />
        <Button
          title="Starte Mehrfachabfrage"
          onPress={() => this.handleMultipleRequests()}
        />
        <View style={{ height: 20 }} />
        <Button
          title="Exportiere Messergebnisse"
          onPress={() => this.copyMeasurementsToClipboard()}
          />
      </View>
    );
  }
}
