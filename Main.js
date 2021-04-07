import React from 'react';
import App from './Apps';
import {ThemeProvider} from 'react-native-elements';
import {DefaultTheme} from '@react-navigation/native';
import {ModalPortal} from 'react-native-modals';
import { LogBox } from 'react-native';
import _ from 'lodash';
LogBox.ignoreLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const Main = () => {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <App />
      <ModalPortal />
    </ThemeProvider>
  );
};

export default Main;
