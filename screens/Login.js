// Erica Moisei //
import React from 'react';
import { Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateEmail, updatePassword, login, getUser, facebookLogin } from '../actions/user';
import firebase from 'firebase';
import styles from '../styles.js';

class Login extends React.Component {

  // example how we can use constructor and redux together
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: '',
      password: ''
    };
    this.onLogin = this.onLogin.bind(this);
  }
  // updateing email and password to execute the Autentication
  onLogin() {
    this.props.updateEmail(this.state.email);
    this.props.updatePassword(this.state.password);
    this.props.login();
  }
  // Cheking if the user is already logged in to bring hip to the Home page
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) =>{
      if(user){
        this.props.getUser(user.uid)
        if(this.props.user != null){
          this.props.navigation.navigate('Home')
        }
      }
    })
  }
 // rendering inputs and buttons for login or signup
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <TextInput style={styles.border} value={this.state.email} 
          onChangeText={email => this.setState({ email })} placeholder='Email'/>
        <TextInput style={styles.border} value={this.state.password} 
          onChangeText={password => this.setState({ password })} placeholder='Password'
          secureTextEntry={true}/>
          {/* login */}
        <TouchableOpacity style={styles.button} onPress={this.onLogin}> 
          <Text>Login</Text>
        </TouchableOpacity>
        {/* FB login */}
        <TouchableOpacity style={styles.facebookButton} onPress={() => this.props.facebookLogin()}> 
          <Text style={{color: 'white'}}>Facebook Login</Text>
        </TouchableOpacity>
        <Text style={styles.mrgTop}>OR</Text>
        {/* signup */}
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}> 
          <Text style={[styles.signup, styles.mrgTop]}>Signup</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ updateEmail, updatePassword, login, getUser, facebookLogin }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);