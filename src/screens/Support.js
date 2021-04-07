/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {ListItem, Divider} from 'react-native-elements';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
const items = [
  {
    title: 'Bagaimana Cara kerja aplikasi ini?',
    link: '',
  },
  {
    title: 'Apakah aplikasi ini bisa di install di android dibawah versi 6.0 ?',
    link: '',
  },
];
function Support(props) {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <HeaderWithoutSearch
        style={styles.HeaderWithActionButton}
        title={'Support'}
        navigation={navigation}
      />
      <ScrollView style={[styles.boxCardHolder, props.style]}>
        <Image
          source={require('../assets/images/1530001243406-1920x1280-FIT_AND_TRIM-254e28ab55ced9aa66b75f42a909a759.jpeg')}
          resizeMode={'cover'}
          style={{width: '100%', height: 180, marginTop: 0}}
        />
        <View style={styles.boxCard}>
          <Text style={styles.selamatDatang}>Support</Text>
          <Divider style={{backgroundColor: '#999'}} />
          <ScrollView refreshControl={<RefreshControl onRefresh={''} />}>
            {items.map((item, i) => {
              return (
                <ListItem
                  key={i}
                  bottomDivider
                  onPress={() => navigation.navigate('Detail', i)}>
                  <ListItem.Content>
                    <ListItem.Title>{item.title}</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
      <Footer navigation={navigation} style={styles.footer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  HeaderWithActionButton: {
    height: 20,
    width: '100%',
    marginTop: 26,
    marginLeft: 0,
  },
  boxCardHolder: {
    backgroundColor: '#fff',
    position: 'absolute',
    width: '100%',
    top: 25,
  },
  boxCard: {
    margin: 10,
    backgroundColor: '#fff',
    marginTop: -50,
    borderRadius: 5,
  },
  textWrapper: {
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    color: '#000',
    backgroundColor: 'transparent',
    lineHeight: 18,
  },
  image: {
    top: 0,
    left: 0,
    width: '100%',
    height: 100,
    position: 'relative',
    flex: 0.1,
  },
  image_imageStyle: {},
  selamatDatang: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 20,
    elevation: 2,
  },
  appsV10: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 22,
    marginTop: 100,
    marginLeft: 0,
    textAlign: 'center',
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
  rectStack: {
    width: '100%',
    height: '100%',
  },
});

export default Support;
