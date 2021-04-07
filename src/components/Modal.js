/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from 'react-native';
import {Modalize} from 'react-native-modalize';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);

const data = [
  {
    uri: 'https://i.imgur.com/GImvG4q.jpg',
    title: 'Lorem ipsum dolor sit amet',
    content: 'Neque porro quisquam est qui dolorem ipsum quia ',
  },
  {
    uri: 'https://i.imgur.com/Pz2WYAc.jpg',
    title: 'Lorem ipsum ',
    content: 'Neque porro quisquam est qui dolorem ipsum ',
  },
  {
    uri: 'https://i.imgur.com/IGRuEAa.jpg',
    title: 'Lorem ipsum dolor',
    content: 'Neque porro quisquam est qui',
  },
  {
    uri: 'https://i.imgur.com/fRGHItn.jpg',
    title: 'Lorem ipsum dolor',
    content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
  },
  {
    uri: 'https://i.imgur.com/WmenvXr.jpg',
    title: 'Lorem ipsum ',
    content: 'Neque porro quisquam est qui dolorem ipsum quia dolor ',
  },
];

const renderItem = ({item, index}) => {
  const {uri, title, content} = item;
  return (
    <TouchableOpacity activeOpacity={1}>
      <View style={{height: 60, alignContent: 'center'}}>
        <Text>Selamat</Text>
        <Text>Pagi</Text>
        <Text>{content}</Text>
      </View>
    </TouchableOpacity>
  );
};
let scrollY = 0;
const renderFloatingComponent = () => (
  <AnimatedTouchableOpacity
    style={[
      s.floating,
      {
        opacity: scrollY.interpolate({
          inputRange: [100, 200],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        }),
        transform: [
          {
            scale: scrollY.interpolate({
              inputRange: [100, 150],
              outputRange: [0.6, 1],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
    ]}
    activeOpacity={0.75}>
    <Text style={s.floating__text}>Top</Text>
  </AnimatedTouchableOpacity>
);

function Modal(props) {
  const aceEditorRef = useRef(null);
  scrollY = useRef(new Animated.Value(0)).current;
  return (
    <View>
      <TouchableOpacity onPress={() => aceEditorRef.current.open()}>
        <Text>Open the modal</Text>
      </TouchableOpacity>

      <Modalize
        ref={aceEditorRef}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: 300,
              height: 300,
            }}>
            <Text>MY TEXT </Text>
            <Text>MY TEXT </Text>
            <Text>MY TEXT </Text>
            <Text>MY TEXT </Text>
            <Text>MY TEXT </Text>
            <Text>MY TEXT </Text>
          </View>
        </View>
      </Modalize>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 50,
  },
  modal: {
    position: 'absolute',
    top: 0,
  },
  carousel: {
    flex: 1,
    backgroundColor: '#141518',
  },
  item: {
    borderWidth: 2,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    borderColor: 'white',
    elevation: 3,
  },
  imageBackground: {
    flex: 2,
    backgroundColor: '#EBEBEB',
    borderWidth: 5,
    borderColor: 'white',
  },
  rightTextContainer: {
    marginLeft: 'auto',
    marginRight: -2,
    backgroundColor: 'rgba(49, 49, 51,0.5)',
    padding: 3,
    marginTop: 3,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightText: {color: 'white'},
  lowerContainer: {
    flex: 1,
    margin: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  contentText: {
    fontSize: 12,
  },
});

const s = StyleSheet.create({
  item: {
    alignItems: 'flex-start',

    padding: 15,

    borderBottomColor: '#f9f9f9',
    borderBottomWidth: 1,
  },

  item__name: {
    fontSize: 16,

    marginBottom: 5,
  },

  item__email: {
    fontSize: 14,
    fontWeight: '200',
    color: '#666',
  },

  floating: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,

    position: 'absolute',
    right: 20,
    bottom: 20,

    width: 60,
    height: 60,

    borderRadius: 30,
    backgroundColor: '#333',
  },

  floating__text: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Modal;
