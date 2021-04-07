import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchBar} from 'react-native-elements';

const HeaderSearch = () => {
  const handleChange = () => {};
  return (
    <View style={styles.container}>
      <SearchBar
        platform={'ios'}
        placeholder="Search..."
        onChangeText={handleChange}
        value={''}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 0,
    width: '100%',
  },
  HeaderSearch: {
    backgroundColor: 'transparent',
  },
});
export default HeaderSearch;
