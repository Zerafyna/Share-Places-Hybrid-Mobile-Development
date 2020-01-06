// Erica Moisei //
import React from 'react';
import TabNavigator from './TabNavigator';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthNavigator from './AuthNavigator';

// Swithces between Autentication screens and Home (logged in users)
const SwitchNavigator = createSwitchNavigator({
    Home: {
      screen: TabNavigator
    },
    Auth:{
      screen: AuthNavigator
    }  
  },
  {
    initialRouteName: 'Auth',
  }
);

export default createAppContainer(SwitchNavigator);