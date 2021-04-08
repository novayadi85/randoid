/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function ListView(params) {
  const {props} = params;
  const {item} = props;
  const {file} = item || { file : {src : false}}
  // console.log(item)
  let img = {uri: file.src} 
  if(!file) img = require('../assets/images/cardImage4.png')
  
  return (
    <View style={[styles.container, params.style]}>
      <View style={styles.cardBody}>
        <TouchableOpacity
          style={styles.imageHolder}
          onPress={() => props.navigation.navigate('Detail')}>
          <Image
            source={img}
            style={styles.cardItemImagePlace}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('Detail')}>
          <Text style={styles.titleStyle}>{item.title}</Text>
          <Text style={styles.subtitleStyle}>{'subtitle write here'}</Text>
          <Text style={styles.actionButton}>
            <MaterialCommunityIconsIcon
              name="map-marker"
              style={styles.inputLeftIcon}
            />{' '}
            {item.distance ? item.distance : '100 km'}
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
