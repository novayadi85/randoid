/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

const FlexDirectionBasics = () => {
  const [flexDirection, setflexDirection] = useState('column');

  return (
    <PreviewLayout
      label="flexDirection"
      values={['Adventure', 'History', 'Recreation']}
      selectedValue={flexDirection}
      setSelectedValue={setflexDirection}
    />
  );
};

const PreviewLayout = ({
  label,
  children,
  values,
  selectedValue,
  setSelectedValue,
}) => (
  <View style={{padding: 10, flex: 1}}>
    <View style={styles.row}>
      {values.map((value, index) => (
        <TouchableOpacity
          key={index.toString()}
          onPress={() => setSelectedValue(index)}
          style={[styles.button, selectedValue === index && styles.selected]}>
          <View style={styles.center}>
            <Image
              source={require('../assets/images/cardImage4.png')}
              style={styles.cardItemImagePlace}
            />
          </View>
          <Text
            style={[
              styles.buttonLabel,
              selectedValue === index && styles.selectedLabel,
            ]}>
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={[styles.container, {[label]: selectedValue}]}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: '#fff',
  },
  cardItemImagePlace: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  box: {
    width: 100,
    height: 100,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    marginHorizontal: '1%',
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
  },
  selectedLabel: {},
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
});

export default FlexDirectionBasics;
