import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderSearch from './HeaderSearch';
const HeaderWithActionButton = props => {
  const [showSearchBar, setshowSearchBar] = React.useState(false);
  const {
    navigation: {goBack},
  } = props;

  const handleSearchBar = () => {
    if (showSearchBar) {
      setshowSearchBar(false);
    } else {
      setshowSearchBar(true);
    }
  };

  return (
    <ScrollView>
      <View style={[styles.container, props.style]}>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => goBack()}
            style={styles.leftIconButton}>
            <Icon name="ios-arrow-back" style={styles.leftIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.textWrapper}>
          <Text numberOfLines={1} style={styles.category}>
            {props.title}
          </Text>
        </View>
        <View style={styles.rightWrapper}>
          <TouchableOpacity
            style={styles.rightIconButton}
            onPress={() => handleSearchBar()}>
            <Icon name="search" style={styles.rightIcon} />
          </TouchableOpacity>
        </View>
      </View>
      {showSearchBar ? <HeaderSearch /> : <Text />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#EFEFF4',
    paddingRight: 8,
    paddingLeft: 8,
  },
  button: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  leftIconButton: {
    flexDirection: 'row',
  },
  leftIcon: {
    color: '#007AFF',
    fontSize: 20,
  },
  leftText: {
    fontSize: 18,
    color: '#007AFF',
    paddingLeft: 5,
    alignSelf: 'center',
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  category: {
    fontSize: 17,
    lineHeight: 17,
    color: '#000',
  },
  rightWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightIconButton: {},
  rightText: {
    color: '#007AFF',
    fontSize: 30,
    textAlign: 'right',
    right: 10,
  },
});

export default HeaderWithActionButton;
