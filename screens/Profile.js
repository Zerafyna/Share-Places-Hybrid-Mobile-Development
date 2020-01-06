// Erica Moisei //
import React from 'react';
import { Text, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
import styles from '../styles.js';
import { updateUserName, updateEmail, updatePassword, updateBio, updatePhoto } from '../actions/user';

class Profile extends React.Component {
render() {
  // Using Firebase Logout + clearing the user state after logout
  signOut = () => {
    firebase.auth().signOut().then(function() {}).catch(function(error) { console.log(error) });
    this.props.updateEmail(null);
    this.props.updateUserName(null);
    this.props.updateBio(null);
    this.props.updatePhoto(null);
    this.props.navigation.navigate('Login')
  }
  // Displaying user info: picture, email, user name, bio + Edit Info btn, logout btn
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Image style={styles.roundImageBig} source={{uri: this.props.user.photo}}/>
        <Text style={styles.txtBig}>Email: {this.props.user.email}</Text>
        <Text style={styles.txtBig}>User Name: {this.props.user.userName}</Text>
        <Text style={[styles.txtBig, styles.mrgBottom]}>Bio: {this.props.user.bio}</Text>
        {/* Edit use rinfo - navigates to Edit screen  */}
        <TouchableOpacity style={styles.buttonSmall} onPress={() => this.props.navigation.navigate('Edit')}>
          <Text style={styles.bold}>Edit Profile</Text>
        </TouchableOpacity>
        {/* logout  */}
        <TouchableOpacity style={styles.buttonSmall} onPress={() => signOut()}>
          <Text style={styles.bold}>Logout</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ updateUserName, updateEmail, updatePassword, updateBio, updatePhoto }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)