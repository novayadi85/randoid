/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  RefreshControl,
} from 'react-native';
import Footer from '../components/Footer';
import { Button } from 'react-native-elements';
import Data from '../data/dummy';
import HeaderSearch from '../components/HeaderSearch';
import ListView from '../components/ListView';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {ModalTitle, ModalContent, BottomModal} from 'react-native-modals';
import Example from '../components/Example';

const ListListing = param => {
  return <ListView props={param} />;
};

const onRefresh = () => {};

function Listing(props) {
  const {navigation} = props;
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <HeaderSearch title={'Listing'} navigation={navigation} />
      </View>
      <View style={styles.ListView}>
        <Text style={styles.title}>Tempat Wisata</Text>
        <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} />}>
          {Data.map((item, index) => {
            return (
              <ListListing
                item={item}
                navigation={navigation}
                key={index.toString()}
              />
            );
          })}
        </ScrollView>
        <View style={styles.buttonFilter}>
          <Button
            icon={
              <MaterialIconsIcon
                style={styles.btnIcon}
                name="tune"
                size={15}
                color="#000"
              />
            }
            type="outline"
            iconRight={false}
            title="Filter"
            onPress={toggleModal}
          />
        </View>
      </View>
      <BottomModal
        visible={isModalVisible}
        onTouchOutside={toggleModal}
        height={0.8}
        width={1}
        onSwipeOut={toggleModal}
        modalTitle={
          <ModalTitle
            title="Filter Tourism"
            hasTitleBar={true}
            style={styles.modalTitle}
          />
        }>
        <ModalContent
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}>
          <Example />
        </ModalContent>
      </BottomModal>      
      <Footer navigation={navigation} style={styles.footer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalTitle: {
    backgroundColor: '#fff',
    color: '#000',
  },
  filtering: {
    flex: 1,
    backgroundColor: '#000000',
    paddingRight: 8,
    paddingLeft: 8,
  },
  buttonFilter: {
    bottom: 0,
    left: 0,
    margin: 10
  },  
  btnIcon: {
    backgroundColor: 'transparent',
    color: '#616161',
    fontSize: 24,
    opacity: 0.8,
    marginRight: 10
  },
  button: {
    backgroundColor: 'white'
  },
  ListView: {
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
  scroll: {
    top: 55,
    backgroundColor: '#ccc',
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
  HeaderWithActionButton: {
    height: 20,
    width: '100%',
    marginTop: 26,
    marginLeft: 0,
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
  ButtonPrimary: {
    height: 36,
    width: 100,
    marginTop: 0,
    marginLeft: 0,
  },
  title: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10
  },
});

export default Listing;
