import React from 'react';
import {StyleSheet, View, ScrollView, ActivityIndicator} from 'react-native';
import HeaderWithActionButton from '../components/HeaderWithActionButton';
import Footer from '../components/Footer';

function Category(props) {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <HeaderWithActionButton
        style={styles.HeaderWithActionButton}
        title={'Category'}
        navigation={navigation}
      />
      <ScrollView>
        <ActivityIndicator />
      </ScrollView>
      <Footer navigation={navigation} style={styles.footer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  HeaderWithActionButton: {
    height: 44,
    width: 355,
    marginTop: 26,
    marginLeft: 5,
  },
  footer: {
    height: 73,
    width: '100%',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    zIndex: 10000,
  },
});

export default Category;
