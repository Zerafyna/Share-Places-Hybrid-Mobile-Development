// Erica Moisei //
import React from 'react';
import styles from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uploadPhoto } from '../actions/index';
import { updatePhoto } from '../actions/post';
import { Camera, Permissions, ImageManipulator } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, TouchableOpacity } from 'react-native';

class CameraUpload extends React.Component {

  
  snapPhoto = async () => {
    // asking permission for camera use
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    if (status === 'granted') {
      // using camera to get the picture
      const image = await this.camera.takePictureAsync()
      if(!image.cancelled){
        //compressing the image to save datausage while testing 
        const resize = await ImageManipulator.manipulateAsync(image.uri, [], { format: 'jpg', compress: 0.1 })
        const url = await this.props.dispatch(uploadPhoto(resize))
        // dispatching the url and navigating the Post
        this.props.dispatch(updatePhoto(url))
        this.props.navigation.goBack()
        url ? this.navigate() : null
      }
    }
  }
  // Navigate to the Post to continue
  navigate = () =>{
    this.props.navigation.goBack();
    this.props.navigation.navigate('Post');
  } 
  // setting up buttons: Take picture and Go back
  render() {
    return (
      <Camera style={{flex:1}} ref={ref => { this.camera = ref }} type={Camera.Constants.Type.back}>
        <SafeAreaView style={{flex:1}}>
          <TouchableOpacity style={{ paddingLeft: 30, paddingTop:30 }} onPress={() => this.props.navigation.goBack()} >
            <Ionicons color={'white'} name={'ios-arrow-back'} size={40}/>
          </TouchableOpacity>
        </SafeAreaView>
        <TouchableOpacity style={styles.cameraButton} onPress={() => this.snapPhoto()} />
      </Camera>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ uploadPhoto, updatePhoto }, dispatch)
  }

const mapStateToProps = (state) => {
    return {}
  }
  
export default connect(mapStateToProps)(CameraUpload)