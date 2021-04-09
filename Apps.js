import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from "react-navigation-drawer";
import About from './src/screens/About';
import App from './src/screens/App';
import Category from './src/screens/Category';
import Listing from './src/screens/Listing';
import Support from './src/screens/Support';
import Detail from './src/screens/Detail';
import Provider from './src/components/Provider';

const DrawerNavigation = createDrawerNavigator({
  Home: App,
  About: About,
  Support: Support,
  Listing: Listing,
});

const StackNavigation = createStackNavigator(
  {
    DrawerNavigation: {
      screen: DrawerNavigation
    },
    App: App,
    About: About,
    Support: Support,
    Listing: Listing,
    Category: Category,
    Detail: Detail,
  },
  {
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(StackNavigation);

function Apps() {
  return (<Provider><AppContainer /></Provider>);
}

export default Apps;
