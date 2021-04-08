/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect , useContext } from 'react';
import { ScrollView, StyleSheet, View, Button } from 'react-native';
import {
  Dropdown,
  GroupDropdown,
  MultiselectDropdown,
} from 'sharingan-rn-modal-dropdown';
import { Context } from './Provider';
export const data = [
  {
    value: '1',
    label: 'Tiger Nixon',
    employee_salary: '320800',
    employee_age: '61',
    avatarSource: {
        uri: 'https://img.icons8.com/color/344/circled-user-male-skin-type-5.png',
    },
  },
  {
    value: '2',
    label: 'Tiger Nixon',
    employee_salary: '320800',
    employee_age: '61',
    avatarSource: {
        uri: 'https://img.icons8.com/color/344/circled-user-male-skin-type-5.png',
    },
  }
];


export const locations = [
  {
    value: '1',
    label: 'Denpasar',
  },
  {
    value: '2',
    label: 'Badung',
  }
];

const FilterList = (props) => {
  const { state: db } = props
  const [valueMS, setValueMS] = useState('');
  const [valueSS, setValueSS] = useState('');
  const [valueGS, setValueGS] = useState('');
  const onChangeMS = (value) => {
    setValueMS(value);
  };
  const onChangeSS = (value) => {
    setValueSS(value);
  };
  const onChangeGS = (value) => {
    setValueGS(value);
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          <MultiselectDropdown
            label="Select category of Tourism"
            data={data}
            enableSearch
            enableAvatar
            chipType="outlined"
            value={valueMS}
            onChange={onChangeMS}
          />
        </View>
        <View style={styles.container}>
          <Dropdown
            label="Select Location"
            data={locations}
            enableSearch
            value={valueSS}
            onChange={onChangeSS}
          />
        </View>
        <View style={[styles.container]}>
          <Button onPress={() => {
            aCallback([6,4,5,7])
          }} title="Apply"/>
        </View>
       
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    flex: 1,
  },
  buttonView: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  bottom: {
    width: '100%',
    paddingTop: 30,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    position: 'absolute',
    bottom: 0,
  }
});

export default FilterList;
