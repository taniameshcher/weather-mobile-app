/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import OutsideWidget from './OutsideWidget';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

export default App = () => {
  const [showOutsideWidget, setShowOutsideWidget] = useState(false);

  handleOutsideTemp = () => {
    setShowOutsideWidget(true);
  };

  return (
    <PaperProvider theme={theme}>
      <View>
        {showOutsideWidget ? (
          <OutsideWidget />
        ) : (
          <React.Fragment>
            <Button
              title="Temperature outside"
              onPress={this.handleOutsideTemp}></Button>

            <Button
              title="Temperature inside"
              onPress={this.handleInnerTemp}></Button>
          </React.Fragment>
        )}
      </View>
    </PaperProvider>
  );
};
