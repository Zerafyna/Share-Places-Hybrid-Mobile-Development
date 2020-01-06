// Erica Moisei //
import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ImagePicker, Permissions } from 'expo';
import { updatePhoto, updateEmail, updatePassword, updateUserName, updateBio, signup, updateUser } from '../actions/user';
import { uploadPhoto } from '../actions';
import styles from '../styles.js';

class Signup extends React.Component {
  // checking the rout name to display different options for signup and edit
  onPress = () => {
    const { routeName } = this.props.navigation.state
    if(routeName === 'Signup'){
      this.props.signup()
      this.props.navigation.navigate('Home')
    } else {
      this.props.updateUser()
      this.props.navigation.goBack()
    }
  }

  // usig library and permission to get the user profile picture
  openLibrary = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status === 'granted') {
      const image = await ImagePicker.launchImageLibraryAsync()
      if(!image.cancelled ){
        const url = await this.props.uploadPhoto(image)
        this.props.updatePhoto(url)
      }
    }
  }

  render() {
    // getting the rout name from the state
    const { routeName } = this.props.navigation.state
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TouchableOpacity style={styles.center} onPress={this.openLibrary} >
          <Image style={styles.roundImageBig} source={{uri: this.props.user.photo}}/>
          <Text style={styles.bold}>Upload Photo</Text>
        </TouchableOpacity>
        <TextInput style={styles.border} editable={routeName === 'Signup' ? true : false} 
          value={this.props.user.email} onChangeText={input => this.props.updateEmail(input)} placeholder='Email'/>
        <TextInput style={styles.border} editable={routeName === 'Signup' ? true : false}
          value={this.props.user.password} onChangeText={input => this.props.updatePassword(input)} 
          placeholder='Password' secureTextEntry={true}/>
        <TextInput style={styles.border} value={this.props.user.userName} onChangeText={input => this.props.updateUserName(input)} 
          placeholder='UserName'/>
        <TextInput style={styles.border} value={this.props.user.bio} onChangeText={input => this.props.updateBio(input)} placeholder='Bio'/>
        <TouchableOpacity style={styles.button} onPress={this.onPress}> 
          <Text>Done</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({  updatePhoto, uploadPhoto, updateUser, updateEmail, updatePassword, updateUserName, updateBio, signup }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);