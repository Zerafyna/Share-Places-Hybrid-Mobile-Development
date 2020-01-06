// Erica Moisei //
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Login from '../screens/Login';
import HomeScreen from '../screens/Home';
import PostScreen from '../screens/Post';
import ActivityScreen from '../screens/Activity';
import ProfileScreen from '../screens/Profile';
import CameraScreen from '../screens/Camera';
import MapScreen from '../screens/Map';
import EditScreen from '../screens/Signup';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { TouchableOpacity, Image } from 'react-native';

// Creating screens for Home, Map and Camera
export const HomeNavigator = createAppContainer(createStackNavigator(
  {
    Home: { 
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <Image style={{width: 130, height: 38, marginLeft: 15}} source={require('../assets/logo.png')} />,
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate('Camera')} >
            <Ionicons style={{marginRight: 10}} name={'ios-camera'} size={30}/>
          </TouchableOpacity>
         ),
      })
    },
    Map: {
      screen: MapScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Map View',
        headerLeft: (
          <TouchableOpacity style={styles.mrgHoriz} onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    Camera: { 
      screen: CameraScreen,
      navigationOptions: {
        header: null
      }
    }
  }
));

// Setting up the navigation between the screens
HomeNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.routes.some(route => route.routeName === 'Camera')) {
    tabBarVisible = false
  }
  if (navigation.state.routes.some(route => route.routeName === 'Map')) {
    tabBarVisible = false
  }
  return {
    tabBarVisible,
  }
}
// Tab options 
export const PostNavigator = createAppContainer(createStackNavigator(
  {
    Post: { 
      screen: PostScreen,
      navigationOptions: {
        title: 'Post'
      }
    }
  }
));
// Tab options 
export const ActivityNavigator = createAppContainer(createStackNavigator(
  {
    Activity: { 
      screen: ActivityScreen,
      navigationOptions: {
        title: 'Activity'
      }
    }
  }
));
// Tab options + screens for Profile View and Edit
export const ProfileNavigator = createAppContainer(createStackNavigator(
  {
    Profile: { 
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile'
      }
    },
    Edit: {
      screen: EditScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Edit Profile',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    }
  }
));