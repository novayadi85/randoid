/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, Image, ScrollView, RefreshControl, ActivityIndicator} from 'react-native';
import Footer from '../components/Footer';
import HeaderWithActionButton from '../components/HeaderWithActionButton';
import {ListItem, Divider} from 'react-native-elements';
import db from '../config';
function Support(props) {
  const {navigation} = props;
  const [items,setItems] = useState([])
  const [loading,setLoading] = useState(true)
  const getData = () => {
    const collections = []
    db.collection(`root_collection/tourism/pages`).where('type', '==', 'support').get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            const item = doc.data();
            const { file } = item
            let img = require('../assets/images/cardImage4.png')
            if(file){
                const {src} = file
                if(src){
                    img = {uri : src}
                }
            }
            item.image = img;
            collections.push(item)
        })
    }).then(() => {
      setItems(collections)
      setLoading(false);
    })
  }
  
  
  useEffect(() => {
    getData();
  }, [])

  return (
    <View style={styles.container}>
      <HeaderWithActionButton
        style={styles.HeaderWithActionButton}
        title={'Support and Help'}
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
          {(!loading) ? (
            <ScrollView refreshControl={<RefreshControl onRefresh={''} />}>
              {items.map((item, i) => {
                return (
                  <ListItem
                    key={i}
                    bottomDivider
                    onPress={() => navigation.navigate('Page', {
                      slug : item.slug,
                    })}>
                    <ListItem.Content>
                      <ListItem.Title>{item.title}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                );
              })}
              </ScrollView>
          ) : (
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color="#000000" />
              <Text style={{textAlign: 'center', marginTop: 10}}>Loading...</Text>
            </View>
          )}
        </View>
      </ScrollView>
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
  boxCardHolder: {
    backgroundColor: '#fff',
    position: 'absolute',
    width: '100%',
    top: 65,
  },
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

export default Support;
