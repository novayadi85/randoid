/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList, Image, StyleSheet, Text, Button} from 'react-native';
import {Row, Grid} from 'react-native-easy-grid';
export default function GridView(props) {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={props.dataSource}
        renderItem={({item}) => (
          <View style={styles.imageContainerStyle}>
            <Image
              style={styles.imageStyle}
              source={{
                uri: item.image,
              }}
            />
            <View style={styles.Item}>
              <Text>{item.caption}</Text>
              <Text style={{fontWeight: 'bold'}}>{item.header}</Text>
            </View>
          </View>
        )}
        //Setting the number of column
        numColumns={2}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    backgroundColor: '#FFF',
    elevation: 3,
    overflow: 'hidden',
  },
  imageStyle: {
    height: 120,
    width: '100%',
  },
  Item: {
    padding: 10,
    backgroundColor: '#FFF',
    flex: 1,
  },
});
