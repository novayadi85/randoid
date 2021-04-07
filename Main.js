import React from 'react';
import App from './Apps';
import {ThemeProvider} from 'react-native-elements';
import {DefaultTheme} from '@react-navigation/native';
import {ModalPortal} from 'react-native-modals';

const Main = () => {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <App />
      <ModalPortal />
    </ThemeProvider>
  );
};

export default Main;
