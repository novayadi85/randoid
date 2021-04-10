/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { nSQL } from '@nano-sql/core';
import { getDistance } from '../utils/helper';
export default function ListView(params) {
  const [location, setLocation] = useState({});
  const [distance, setDistance] = useState(1);
  const {props} = params;
  const {item} = props;
  const {file, subtitle} = item ;
  let img = require('../assets/images/cardImage4.png')
  if(file){
    const {src} = file
    if(src){
      img = {uri : src}
    }
  }

  useEffect(() => {
    nSQL("position").query('select').exec().then(result => {
      const {latitude, longitude} = item
      if(latitude && longitude) {
        result.forEach(function({data:res}){
          const t = getDistance(
            res,
            latitude,
            longitude,
            'K',
          )
          setDistance(t)
        });
        
      }
    })
  }, [item])

 // const img = (src) ? {uri: src}  : require('../assets/images/cardImage4.png')

  return (
    <View style={[styles.container, params.style]}>
      <View style={styles.cardBody}>
        <TouchableOpacity
          style={styles.imageHolder}
          onPress={() => props.navigation.navigate('Detail', {
            item: item,
            distance: distance,
          })}>
          <Image
            source={img}
            style={styles.cardItemImagePlace}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('Detail', {
            item: item,
            distance: distance,
          })}>
          <Text style={styles.titleStyle}>{item.title}</Text>
          <Text style={styles.subtitleStyle}>{subtitle}</Text>
          <Text style={styles.actionButton}>
            <MaterialCommunityIconsIcon
              name="map-marker"
              style={styles.inputLeftIcon}
            />{' '}
            {distance ? `${distance} KM` : '100 KM'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    flexWrap: 'nowrap',
    overflow: 'hidden',
    borderBottomColor: 1,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
  },
  button: {
    padding: 0,
    paddingTop: 5,
    paddingBottom: 24,
    marginLeft: 5,
    flex: 1,
    width: '60%',
  },
  titleStyle: {
    fontSize: 14,
    color: '#000',
    paddingBottom: 2,
    fontWeight: '500',
    marginTop: 5,
    marginLeft: 1,
  },
  inputLeftIcon: {
    color: '#ffa500',
    fontSize: 18,
    alignSelf: 'center',
    paddingLeft: 0,
    paddingRight: 5,
    textAlign: 'left',
    lineHeight: 16,
  },
  subtitleStyle: {
    fontSize: 12,
    color: '#999',
    lineHeight: 16,
    opacity: 0.8,
    marginLeft: 1,
  },
  actionButton: {
    lineHeight: 16,
    marginLeft: 0,
    paddingTop: 10,
    fontSize: 12,
  },
  imageHolder: {
    backgroundColor: '#fff',
    height: 'auto',
    width: '25%',
    margin: 10,
    marginRight: 5,
  },
  cardItemImagePlace: {
    backgroundColor: '#fff',
    width: '100%',
    height: 80,
    margin: 0,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 7,
  },
});
