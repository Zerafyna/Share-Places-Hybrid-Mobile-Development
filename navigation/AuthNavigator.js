// Erica Moisei //
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Login from '../screens/Login';
import SignupScreen from '../screens/Signup';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

// Creating screens for Login and Signup
const StackNavigator = createStackNavigator({
    Login: {
      screen: Login,
      navigationOptions:{
        header: null
      }
    },
    Signup: {
      screen: SignupScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Signup',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    }
});

export default createAppContainer(StackNavigator);