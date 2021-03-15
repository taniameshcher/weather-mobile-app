/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import moment from 'moment';

export default App = () => {
  const [data, setData] = useState('Mood');
  const [isLoading, setLoading] = useState(true);

  function roundTemp(temp) {
    const roundTemp = parseFloat(temp).toFixed(2);
    return roundTemp;
  }

  function getUtcTime(date) {
    const datum = new Date(date * 1000);
    var utcTime = moment(datum.toUTCString());
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
        <Text>Data is Loading</Text>
      ) : (
        <React.Fragment>
          <Text>{data.Temperatur}</Text>
          <Text>{data.Datum}</Text>
          <Button
            title="Temperature outside"
            onPress={this.handleOutsideTemp}></Button>
          <Button
            title="Temperature inside"
            onPress={this.handleInnerTemp}></Button>
        </React.Fragment>
      )}
    </View>
  );
};
