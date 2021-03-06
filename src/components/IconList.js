/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
const {width} = Dimensions.get('window')
const IconList = ({
  values,
  selectedValue,
  setSelectedValue,
}) => (
  <View style={{padding: 5, flex: 1}}>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {values.map((value, index) => (
          <View key={index.toString()} style={styles.center}>
            <Image
              source={require('../assets/images/icons/category_03.gif')}
              style={styles.cardItemImagePlace}
            />
            <Text style={styles.buttonLabel}>{value}</Text>
          </View>
      ))}
    </ScrollView>
  </View>
);

const IconLists = (props) => {
  const [flexDirection, setflexDirection] = useState('column');
  const { headline } = props
  return (
    <View style={styles.scrollContainer}>
      <Text style={styles.headline}>{headline}</Text>
      <IconList
        label="flexDirection"
        values={[
          'Adventure',
          'History',
          'Recreation',
          'Cultural tourism',
          'Garden tourism',
          'Medical tourism',
          'Virtual tour',
          'Religious tourism‎',
          'Industrial tourism‎ ',
          'Cooking tourism‎',
          'Walking tourism‎ ',
          'Science tourism',
        ]}
        selectedValue={flexDirection}
        setSelectedValue={setflexDirection}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: '#fff',
  },
  cardItemImagePlace: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  center: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7,
    width: width * 0.20,
    height: 100,
  },
  button: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    alignSelf: 'center',
    marginHorizontal: '1%',
    marginBottom: 10,
    minWidth: '16%',
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
    display:'flex',
    height: 60
  },
  selectedLabel: {},
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
  headline:{
    margin: 0,
    marginTop: 20,
    marginHorizontal: 20,
    color: '#000',
    fontWeight: '700',
  },
  scrollContainer: {
    maxWidth: width - 20,
    overflow: 'hidden',
    marginLeft: 5
  }
});

export default IconLists;
