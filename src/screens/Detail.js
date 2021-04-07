/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import Footer from '../components/Footer';
import HeaderWithActionButton from '../components/HeaderWithActionButton';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import HTML from 'react-native-render-html';
import MapView, {Marker, Geojson} from 'react-native-maps';
const content = `Pura Taman Ayun Mengwi, berlokasi di Jalan Ayodya, Kecamatan
Mengwi, Kabupaten Badung, Bali. Jika anda berangkat dari kawasan
tempat wisata Seminyak, anda harus menempuh jarak sekitar 25
kilometer ke arah jalan Kerobokan, dengan waktu tempuh sekitar 1
jam 10 menit, jika tidak terjadi kemacetan lalu lintas jalan raya.
Bila tidak membawa kendaraan pribadi, anda dapat memanfaatkan
angkutan umum jurusan Denpasar – Singaraja atau Denpasar –
Bedugul. Kemudian anda dapat turun di persimpangan jalan, di Desa
Mengwi dan melanjutkan perjalanan menuju lokasi, dengan berjalan
kaki sekitar 250 meter. Untuk memudahkan anda menemukan lokasi
dari Taman Ayun, mohon gunakan peta di bawah ini!`;

const myPlace = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [36.78825, -120.4324],
      },
    },
  ],
};

function Detail(props) {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <HeaderWithActionButton
        style={styles.HeaderWithActionButton}
        title={'Taman ayun - Denpasar'}
        navigation={navigation}
      />
      <View style={styles.Detail}>
        <ScrollView>
          <Image
            style={styles.image}
            source={require('../assets/images/cardImage4.png')}
          />
          <View style={[styles.wrapper]}>
            <Text style={styles.title}>Taman ayun Mengwitani - Denpasar</Text>
            <Text style={styles.subTitle}>Subtitle here</Text>
            <Text style={styles.actionButton}>
              <MaterialCommunityIconsIcon
                name="map-marker"
                style={styles.inputLeftIcon}
              />{' '}
              12.22 km
            </Text>
            <View style={styles.content}>
              <HTML source={{html: content}} />
            </View>
            <View style={styles.maps}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
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
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                  }}
                  title={'Taman Ayun'}
                  description={'Lorem ipsum'}
                  image={require('../assets/images/logo.png')}
                />
                <Geojson
                  geojson={myPlace}
                  strokeColor="red"
                  fillColor="green"
                  strokeWidth={2}
                />
              </MapView>
            </View>
          </View>
        </ScrollView>
      </View>
      <Footer navigation={navigation} style={styles.footer} />
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
    marginTop: 10,
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
    lineHeight: 16,
  },
  image: {
    maxHeight: 300,
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
