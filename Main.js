import React, { useState, useEffect} from 'react';
import App from './Apps';
import {ThemeProvider} from 'react-native-elements';
import {DefaultTheme} from '@react-navigation/native';
import {ModalPortal} from 'react-native-modals';
import { LogBox, ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import _ from 'lodash';
import db from './src/config';
import { position } from './src/utils/helper';
import { nSQL } from '@nano-sql/core';

LogBox.ignoreLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

db.settings({experimentalForceLongPolling: true});

nSQL().createDatabase({
  id: "tourism-db",
  mode: "TEMP", 
  tables: [
    {
      name: "listings",
      model: {
        "id:uuid": {pk: true},
        "data:object": {},
      }
    },
    {
      name: "categories",
      model: {
        "id:uuid": {pk: true},
        "data:object": {},
      }
    },
    {
      name: "position",
      model: {
        "id:uuid": {pk: true},
        "data:object": {},
      }
    }
  ]
}).then(() => {
  nSQL("listings").query("delete").exec();
  nSQL("position").query("delete").exec().then(async() => {
      await position().then((res) => {
        const {latitude, longitude} = res;
        console.log([latitude, longitude])
        nSQL("position").query('upsert', {
          data: {
            latitude, 
            longitude
          }
        }).exec();
      })
  });
})

const Main = () => {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(true);

  const fetchCollections = async(params) => {
    setFetching(true)
    db.collection("root_collection/tourism/tourism").get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          nSQL("listings").query('upsert', {
            data: doc.data()
          }).exec();
      })
    });

    setFetching(false)
  }

  useEffect(() => {
    setFetching(true);
    fetchCollections();
    setFetching(false);
  }, [])

  return (
    <ThemeProvider theme={DefaultTheme}>
      {fetching ?  (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#000000" />
          <Text style={[styles.center]}>Loading...</Text>
        </View>
      ): (
        <App />
      )}
      <ModalPortal />
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  horizontal: {

  }

})
export default Main;
