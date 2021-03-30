import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Button, Text, View} from 'react-native';
import moment from 'moment';

const OutsideWidget = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState('Mood');

  function roundTemp(temp) {
    const roundTemp = parseFloat(temp).toFixed(2);
    return roundTemp;
  }

  function getUtcTime(date) {
    const datum = new Date(date * 1000);
    var utcTime = moment(datum.toUTCString());
    //FIXME Sommerzeit
    var offsetTime = utcTime.utcOffset(1).format('dd, DD.MM.YYYY HH:mm');
    return offsetTime;
  }

  useEffect(() => {
    this.fetchData();
  }, []);

  fetchData = () => {
    fetch(
      'https://6xt8gjjija.execute-api.eu-west-1.amazonaws.com/default/return_json',
    )
      .then((response) => response.json())
      .then((json) => {
        setData({
          Temperatur: roundTemp(json.records[0].MeasureValue),
          Datum: getUtcTime(json.common_attrs.Time),
          Pressure: json.records[2].MeasureValue,
          Humidity: json.records[5].MeasureValue,
          AmountOfRain: json.records[10].MeasureValue,
          WindSpeed: json.records[7].MeasureValue,
          WindDrection: json.records[6].MeasureValue,
          SolarRadiation: json.records[17].MeasureValue,
        });
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  handlePress = () => {
    // alert('Simple Button pressed');
    this.fetchData();
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <React.Fragment>
          <Text>Außentemperatur</Text>
          <Text>{data.Temperatur}</Text>
          <Text>{data.Datum}</Text>
          <Text>Pressure: {data.Pressure}</Text>
          <Text>Humidity: {data.Humidity}</Text>
          <Text>Amount of rain: {data.AmountOfRain}</Text>
          {/* FIXME https://uni.edu/storm/Wind%20Direction%20slide.pdf */}
          <Text>Wind speed: {data.WindSpeed}</Text>
          <Text>Wind direction: {data.WindDrection}</Text>
          <Text>Solar radiation:{data.SolarRadiation}</Text>
        </React.Fragment>
      )}
    </View>
  );
};
export default OutsideWidget;
