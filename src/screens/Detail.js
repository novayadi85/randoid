/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, ScrollView, ActivityIndicator, Button, Linking,SafeAreaView} from 'react-native';
import Footer from '../components/Footer';
import HeaderWithActionButton from '../components/HeaderWithActionButton';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import HTML from 'react-native-render-html';
import MapView, {Marker, Geojson} from 'react-native-maps';
import GetLocation from 'react-native-get-location';


function Detail(props) {
  const {navigation, navigation : { state} } = props;
  const { params , params: { item, distance, location}} = state;
  const [myPlace, setMyPlace] = useState('');
  const [loading, setLoading] = useState(true);
  const [linkGoogle, setLinkGoogle] = useState('');

  useEffect(() => {
    if(location){
      const _geojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: [location.latitude, location.longitude],
            },
          },
        ],
      };

      const url = `https://www.google.com/maps/dir/?api=1&origin=${location.latitude},${location.longitude}&destination=${item.latitude},${item.longitude}`;
      setLinkGoogle(url)
      setLoading(false)
      setMyPlace(_geojson)
    }
  }, [])

  return ( 
    <View style={styles.container}>
      <SafeAreaView style={{flex: 0}} />
      <SafeAreaView style={{flex: 1}}>
      <HeaderWithActionButton
        style={styles.HeaderWithActionButton}
        title={item.title}
        navigation={navigation}
      />
      <View style={styles.Detail}>
      {(!loading) ? (
          <ScrollView>
          <Image
            style={styles.image}
            source={item.image}
          />
          <View style={[styles.wrapper]}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.actionButton}>
              <MaterialCommunityIconsIcon
                name="map-marker"
                style={styles.inputLeftIcon}
              />{' '}
              {`${distance} KM`}
            </Text>
            <View style={styles.content}>
              <HTML source={{html: item.body}} />
            </View>
            <View style={styles.maps}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: Number(item.latitude),
                  longitude: Number(item.longitude),
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsBuildings={true}
                zoomEnabled={true}
                scrollEnabled={true}
                moveOnMarkerPress={true}
                zoomControlEnabled={true}>
                <Marker
                  coordinate={{
                    latitude: Number(item.latitude),
                    longitude: Number(item.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  title={item.title}
                  description={''}
                  image={require('../assets/images/logo.png')}
                />
                <Geojson
                  geojson={myPlace}
                  strokeColor="red"
                  fillColor="green"
                  strokeWidth={2}
                />
              </MapView>
              <View
                style={{
                  position: 'absolute', //use absolute position to show button on top of the map
                  alignSelf: 'flex-end', //for align to right,
                  bottom: '1%',
                  width: '100%',
                }}>
                <Button
                  style={{
                    margin: 10,
                  }}
                  title="Open in Google Maps"
                  onPress={(_props) => {
                    return Linking.openURL(linkGoogle);
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={[styles.container]}>
          <ActivityIndicator size="large" color="#000000" />
          <Text style={{textAlign: 'center', marginTop: 10}}>Loading...</Text>
        </View>
      )}
        
      </View>
      <Footer navigation={navigation} style={styles.footer} />
      </SafeAreaView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    height: 300,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  wrapper: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 22,
    color: '#000',
    paddingBottom: 2,
    marginTop: 5,
    marginLeft: 1,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    color: '#999',
    lineHeight: 16,
    opacity: 0.9,
    marginLeft: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  content: {
    marginTop: 10,
    marginBottom: 10,
  },
  inputLeftIcon: {
    color: '#ffa500',
    fontSize: 18,
    alignSelf: 'center',
    paddingLeft: 0,
    paddingRight: 5,
    textAlign: 'left',
    lineHeight: 18,
  },
  image: {
    height: 300,
    width: '100%',
    maxHeight: 360
  },
  HeaderWithActionButton: {
    height: 20,
    width: '100%',
    marginTop: 26,
    marginLeft: 0,
  },
  Detail: {
    top: 55,
    backgroundColor: '#fff',
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    paddingTop: 0,
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 150,
  },
  footer: {
    height: 73,
    width: '100%',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 0,
    shadowOpacity: 1,
    shadowRadius: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    zIndex: 10000,
    position: 'absolute',
  },
});

export default Detail;
