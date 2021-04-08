/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';

function Footer(props) {
  const { navigation : { state} } =  props
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('App')}
        style={styles.btnWrapper1}>
        <MaterialCommunityIconsIcon
          name="av-timer"
          style={[
            styles.icon,
            {
              color: state.routeName == 'App' ? '#007AFF' : '#616161',
            },
          ]}
        />
        <Text
          style={[
            styles.home,
            {
              color: state.routeName == 'App' ? '#007AFF' : '#9E9E9E',
            },
          ]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Listing')}
        style={styles.btnWrapper3}>
        <MaterialIconsIcon name="lightbulb-outline" style={[styles.icon2 , {
              color: state.routeName == 'Listing' ? '#007AFF' : '#9E9E9E',
        }]} />
        <Text style={[styles.about, {
              color: state.routeName == 'Listing' ? '#007AFF' : '#9E9E9E',
        }]}>Listing</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('About')}
        style={styles.btnWrapper2}>
        <MaterialCommunityIconsIcon
          name="radiobox-marked"
          style={[styles.icon1, {
            color: state.routeName == 'About' ? '#007AFF' : '#9E9E9E',
          }]}
        />
        <Text style={[styles.listing, {
            color: state.routeName == 'About' ? '#007AFF' : '#9E9E9E',
          }]}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Support')}
        style={styles.btnWrapper4}>
        <MaterialCommunityIconsIcon
          name="checkbox-blank-circle"
          style={[styles.icon3, {
            color: state.routeName == 'Support' ? '#007AFF' : '#9E9E9E',
          }]}
        />
        <Text style={[styles.setting, {
            color: state.routeName == 'Support' ? '#007AFF' : '#9E9E9E',
          }]}>Support</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,1)',
    flexDirection: 'row',
    width: '100%',
  },
  btnWrapper1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    backgroundColor: 'transparent',
    fontSize: 24,
    opacity: 0.8,
  },
  home: {
    fontSize: 12,
    backgroundColor: 'transparent',
    paddingTop: 4,
  },
  btnWrapper2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon1: {
    backgroundColor: 'transparent',
    color: '#616161',
    fontSize: 24,
    opacity: 0.8,
  },
  listing: {
    fontSize: 12,
    color: '#9E9E9E',
    backgroundColor: 'transparent',
    paddingTop: 4,
  },
  btnWrapper3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon2: {
    backgroundColor: 'transparent',
    color: '#616161',
    fontSize: 24,
    opacity: 0.8,
  },
  about: {
    fontSize: 12,
    color: '#9E9E9E',
    backgroundColor: 'transparent',
    paddingTop: 4,
  },
  btnWrapper4: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon3: {
    backgroundColor: 'transparent',
    color: '#616161',
    fontSize: 24,
    opacity: 0.8,
  },
  setting: {
    fontSize: 12,
    color: '#9E9E9E',
    backgroundColor: 'transparent',
    paddingTop: 4,
  },
});

export default Footer;
