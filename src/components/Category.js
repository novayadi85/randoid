/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList, Image, StyleSheet, Text} from 'react-native';

export default function Category(props) {
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
            </View>
          </View>
        )}
        //Setting the number of column
        numColumns={4}
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
    height: 60,
    width: '100%',
    borderRadius: 10,
  },
  Item: {
    padding: 10,
    backgroundColor: '#FFF',
    flex: 1,
    textAlign: 'center',
  },
});
