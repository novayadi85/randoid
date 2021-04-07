/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import Footer from '../components/Footer';
import HeaderWithActionButton from '../components/HeaderWithActionButton';
import HTML from 'react-native-render-html';
const content = `<div id="lipsum">
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum luctus finibus ornare. Mauris tincidunt turpis convallis mi porta, sit amet fringilla turpis dapibus. Curabitur mollis ex eu scelerisque commodo. Cras sollicitudin rutrum felis ut ullamcorper. Nulla egestas ornare tincidunt. Integer porttitor vulputate sapien eu imperdiet. Pellentesque eu ipsum imperdiet, lacinia magna a, tristique leo. Pellentesque accumsan ligula erat, aliquet hendrerit elit blandit a. Sed placerat diam elementum rhoncus tempus. Morbi quis neque nisl. Praesent ullamcorper molestie quam ut porttitor.
</p>
<p>
Nullam facilisis enim lectus. Aenean placerat libero in lobortis ornare. Suspendisse eleifend nisl et erat vestibulum dignissim. Proin tempus sed felis ac placerat. Fusce at nisi arcu. Proin sit amet elit congue, hendrerit lectus sit amet, aliquet tortor. Quisque at lectus quis leo consequat vestibulum scelerisque et sapien. Sed dictum lorem non dui dapibus blandit. Nam vel varius mauris. Vestibulum id lorem sed ipsum facilisis vehicula. Donec ornare, magna vitae dictum vestibulum, urna ante gravida urna, quis dictum felis lacus eu urna. Mauris fermentum porttitor eros, id lacinia dolor consectetur vitae. In et enim tellus. Duis vel tincidunt nunc. Cras molestie mauris sed aliquam euismod.
</p>
<p>
Pellentesque laoreet, augue nec varius malesuada, urna lectus placerat mauris, ut porttitor nulla justo sed metus. Maecenas sit amet tincidunt tortor. Proin ac tempus magna, et tempor nisi. In nec leo at metus convallis molestie sit amet ac nulla. Morbi faucibus libero semper rhoncus suscipit. Nam ac enim ac lacus porta vulputate. Vivamus feugiat urna ante, sit amet facilisis nibh consectetur a.
</p>
<p>
Cras lacinia, urna sed elementum viverra, sapien mi scelerisque arcu, quis luctus nunc justo quis nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc eget faucibus nulla. Nam in sem a lectus mollis fringilla in eget est. Vestibulum sodales diam interdum arcu laoreet lobortis. Proin fringilla lectus sit amet velit sagittis laoreet id a felis. Donec finibus ullamcorper quam, at mattis ante dignissim ac.
</p>
<p>
Etiam diam augue, accumsan sit amet nisi pretium, posuere dignissim nisi. Nam at pulvinar mi, pellentesque pharetra mi. Phasellus vel erat lorem. Cras consectetur sapien eu tortor consectetur iaculis. Suspendisse gravida sagittis sapien, sit amet luctus felis dapibus vitae. Cras vestibulum justo lacus, id interdum ipsum cursus sit amet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc laoreet mi sapien, vitae hendrerit sem blandit ut.
</p></div>`;

function About(props) {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <HeaderWithActionButton
        style={styles.HeaderWithActionButton}
        title={'About'}
        navigation={navigation}
      />
      <View style={styles.Detail}>
        <ScrollView>
          <Image
            style={styles.image}
            source={require('../assets/images/cardImage4.png')}
          />
          <View style={[styles.wrapper]}>
            <Text style={styles.title}>Tentang Aplikasi Tourism v1.0</Text>
            <Text style={styles.subTitle}>Oleh Penulis</Text>
            <View style={styles.content}>
              <HTML source={{html: content}} />
            </View>
          </View>
        </ScrollView>
      </View>
      <Footer navigation={navigation} style={styles.footer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    height: 300,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  wrapper: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 22,
    color: '#000',
    paddingBottom: 2,
    marginTop: 5,
    marginLeft: 1,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    color: '#999',
    lineHeight: 16,
    opacity: 0.9,
    marginLeft: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  content: {
    marginTop: 10,
    marginBottom: 10,
  },
  inputLeftIcon: {
    color: '#ffa500',
    fontSize: 18,
    alignSelf: 'center',
    paddingLeft: 0,
    paddingRight: 5,
    textAlign: 'left',
    lineHeight: 16,
  },
  image: {
    maxHeight: 300,
  },
  HeaderWithActionButton: {
    height: 20,
    width: '100%',
    marginTop: 26,
    marginLeft: 0,
  },
  Detail: {
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
});

export default About;
