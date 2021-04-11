/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, ActivityIndicator} from 'react-native';
import db from '../config';
const {width} = Dimensions.get('window')

const FlexDirectionBasics = (props) => {
  const { headline, navigation} = props;
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCollections = async(param) => {
    const docs = [];
    const limit = 12
    db.collection(`root_collection/tourism/category`).orderBy('name', 'desc').limit(limit).get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const item = doc.data();
          item.docId = doc.id
          item.image = require('../assets/images/cardImage4.png')
          if('file' in item ){
              const { src } = item.file 
              if(src){
                  item.image = {uri : src}
              }
          }
          docs.push(item)
      })
    }).then( () => {
      setLists(docs)
      setLoading(false)
    })
  }

  useEffect(() => {
    setLists([])
    fetchCollections();
  }, [])
  return (
    <View style={styles.Detail}>
      {(!loading) ? (
          <PreviewLayout
            label="flexDirection"
            values={lists}
            navigation={navigation}
            headline={headline}
          />
      ) : (
        <View style={[styles.container]}>
          <ActivityIndicator size="large" color="#000000" />
          <Text style={{textAlign: 'center', marginTop: 10}}>Loading...</Text>
        </View>
      )}
    
  </View>
    
  );
};

const PreviewLayout = ({
  label,
  children,
  values,
  navigation,
  headline
}) => (
  <View style={{padding: 0, flex: 1}}>
    <View style={styles.row}>
      {values.map((value, index) => (
        <TouchableOpacity
          key={index.toString()}
          onPress={() => {
            navigation.navigate('Listing', { item : value, reload: 'false'})}} style={[styles.button]}>
              <View style={styles.box}>
                <View style={styles.center}>
                <Image
                  source={value.image}
                  style={styles.cardItemImagePlace}
                />
              </View>
              <Text
                style={[
                  styles.buttonLabel,
                ]}>
                {value.name}
              </Text>
              </View>
          
        </TouchableOpacity>
      ))}
    </View>
    <View style={[styles.container]}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: '#fff',
  },
  cardItemImagePlace: {
    width: '100%',
    height:'100%',
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 0,
    marginVertical: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: width / 5.5,
    height: width / 5.5,
    marginBottom: 35,
  },
  center: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    alignSelf: 'center',
    marginHorizontal: '0.5%',
    marginBottom: 10,
    minWidth: '22%',
    textAlign: 'center',
  },
  selected: {
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'coral',
    textAlign: 'center',
    marginTop: 10
  },
  selectedLabel: {},
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
});

export default FlexDirectionBasics;
