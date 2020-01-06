// Erica Moisei //
import React from 'react';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { HomeNavigator, PostNavigator, ActivityNavigator, ProfileNavigator } from './StackNavigator';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import styles from '../styles'

// Tab navigator details (icons change when focused)
const TabNavigator = createBottomTabNavigator({
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
          tabBarLabel: ' ',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons style={styles.mrgTop} name={focused ? 'home' : 'home-outline'} size={31} />
        ),
      },
    },
    Post: {
        screen:  PostNavigator,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: ({focused}) => (
              <Ionicons style={styles.mrgTop}  name={focused ? 'ios-add-circle' : 'ios-add-circle-outline'} size={31} />
          ),
        },
    },
    Activity: {
        screen: ActivityNavigator,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: ({focused}) => (
              <Ionicons style={styles.mrgTop} name={focused ? 'ios-heart' : 'ios-heart-empty'} size={31} />
          ),
        },
    },
    Profile: {
        screen: ProfileNavigator,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: ({focused}) => (
              <MaterialIcons style={styles.mrgTop} name={focused ? 'person' : 'person-outline'} size={31} />
          ),
        },
    },
  },
  { 
    tabBarOptions: {
      style: {
        paddingVertical: 10,
        height: 45,
      }
    }
  }
);

export default createAppContainer(TabNavigator);