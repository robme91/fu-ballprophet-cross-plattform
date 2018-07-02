export default class MeasuredSeries {

  constructor (){
    this.startDate = new Date();
    this.apiEndpoint = null;
    this.requestNumber = null;
    this.measurements = [];
  }

  addMeasurement(deltaT, reqNumber){
    this.measurements.push({
      "deltaT": deltaT,
      "reqNumber": reqNumber,
    });
  }

  toString(){
    let params = "Test Parameter [API Endpoint: " + this.apiEndpoint + " | Anzahl Requests: " + this.requestNumber + "]\n";
    let content = "Messreihe " + this.startDate + '\n' + params;
    let sortedMeasurements = this.measurements.sort((a, b) => {
      if(a.reqNumber < b.reqNumber){
        return -1;
      }
      if(a.reqNumber > b.reqNumber){
        return 1;
      }
      return 0;
    });
    sortedMeasurements.forEach((item) => {
      content += item.deltaT +'\n';
    });
    return content;
  }
}
