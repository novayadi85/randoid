/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import Footer from '../components/Footer';
import {today} from '../utils/helper.js'
import FlexDirectionBasics from '../components/FlexDirectionBasics';
function App(props) {
  const {navigation} = props;
  const whatToday = today();
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 0}} />
      <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.boxCardHolder}>
        <ImageBackground style={styles.image} source={require('../assets/images/03978901-ea26-4003-8568-1b83282ea587.jpg')}>
          <View style={styles.Timer}>
            <Text style={styles.TimerText}>
              {whatToday}
            </Text>
            
          </View>
        </ImageBackground>
        
        <View style={styles.boxCard}>
          <Text style={styles.selamatDatang}>
            Welcome to Tourism Apps v 1.0
          </Text>
        </View>
        <View style={styles.FlexDirectionBasics}>
          <FlexDirectionBasics navigation={navigation} headline={''}/>
        </View>
      </ScrollView>
      <Footer navigation={navigation} style={styles.footer} /> 
      </SafeAreaView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBG: {
    flex: 1,
    justifyContent: "center"
  },
  viewAll: {
    fontSize: 14,
    color: 'orange',
    position: 'absolute',
    right: 30,
    top: 10,
    zIndex: 1000
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    padding: 15,
    justifyContent: 'space-between',
    shadowColor: '#111',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 3,
  },
  Timer: {
    position: 'absolute',
    zIndex: 1000,
    padding: 10,
    margin: 'auto',
    justifyContent: 'space-between',
    marginTop: 25
  },  
  TimerText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  boxCardHolder: {
    backgroundColor: '#fff',
  },
  FlexDirectionBasics: {
    marginTop: -30,
  },
  boxCard: {
    margin: 20,
    backgroundColor: '#fff',
    marginTop: -20,
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
    height: 320,
    position: 'relative',
    flex: 0.1,
  },
  image_imageStyle: {},
  selamatDatang: {
    color: '#121212',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  appsV10: {
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
    position: 'absolute'
  },
  rectStack: {
    width: '100%',
    height: '100%',
  },
});

export default App;
