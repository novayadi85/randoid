/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, Image, ScrollView, ActivityIndicator} from 'react-native';
import Footer from '../components/Footer';
import HeaderWithActionButton from '../components/HeaderWithActionButton';
import HTML from 'react-native-render-html';
import db from '../config';
import { findSlug } from '../utils/helper'

function Page(props) {
  const {navigation, navigation : { state} } = props;
  console.log(state)
  const [detail,setDetail] = useState([])
  const [content,setContent] = useState('')
  const [loading,setLoading] = useState(true)

  const getData = () => {
    const slug = findSlug(state);
    if(slug){
        db.collection(`root_collection/tourism/pages`).where('slug', '==', slug).get()
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
                setDetail(item)
                setContent(item.body)
            })
        }).then(() => {
            setLoading(false);
        })
    }
  }
  
  
  useEffect(() => {
    getData();
  }, [loading])

  return (
    <View style={styles.container}>
      <HeaderWithActionButton
        style={styles.HeaderWithActionButton}
        title={detail.title}
        navigation={navigation}
      />
      <View style={styles.Detail}>
          {(detail && !loading) ? (
              <ScrollView>
              <Image
                style={styles.image}
                source={detail.image}
              />
              <View style={[styles.wrapper]}>
                <Text style={styles.title}>{detail.title}</Text>
                <Text style={styles.subTitle}>Oleh Penulis</Text>
                <View style={styles.content}>
                <HTML source={{html: content}} />
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

export default Page;
