/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {ModalTitle, ModalContent, BottomModal} from 'react-native-modals';
import Example from './Example';

function Demo(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <View>
        <Button title="Bottom Modal with Title" onPress={toggleModal} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#999',
  },
  modalTitle: {
    backgroundColor: '#fff',
    color: '#000',
  },
});

export default Demo;
