/* eslint-disable react/jsx-no-duplicate-props */
import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  slideWidth,
  sliderItemHorizontalMargin,
  sliderItemWidth,
  sliderWidth,
} from './Styles';

const {width} = Dimensions.get('window');
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
    <TouchableOpacity
      activeOpacity={1}
      style={styles.item}
      onPress={() => {
        this.numberCarousel.scrollToIndex(index);
      }}>
      <ImageBackground source={{uri: uri}} style={styles.imageBackground}>
        <View style={styles.rightTextContainer}>
          <Text style={styles.rightText}>Lorem</Text>
        </View>
      </ImageBackground>
      <View style={styles.lowerContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.contentText}>{content}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(SLIDER_WIDTH * 0.3);

function ImageCarousel(props) {
  const carouselRef = useRef(null);
  return (
    <Carousel
      style={styles.carousel}
      data={data}
      renderItem={renderItem}
      sliderWidth={SLIDER_WIDTH}
      itemWidth={ITEM_WIDTH}
      itemHeight={ITEM_HEIGHT}
      containerCustomStyle={styles.carouselContainer}
      inactiveSlideShift={0}
      ref={carouselRef}
      enableSnap={true}
      useScrollView={true}
      firstItem={2}
      initialScrollIndex={data.length}
      horizontal={true}
      inverted
      loop
    />
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 50,
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

export default ImageCarousel;
