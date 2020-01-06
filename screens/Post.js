// Erica Moisei //
import React from 'react';
import { FlatList, Modal, SafeAreaView, Text, View, TextInput, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import { ImagePicker, Location, Permissions } from 'expo';
import { updateDescription, updateLocation, uploadPost, updatePhoto } from '../actions/post';
import { uploadPhoto } from '../actions';
import styles from '../styles';

const GOOGLE_API = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'

class Post extends React.Component{
// higing the modal with locations before it is needed
state = {
    showModal: false, 
    locations: []
    }

componentDidMount(){ this.getLocations() }

// clearing the post after the Posting is finished
clear = () => {
    this.props.updatePhoto(null);
    this.props.updateDescription(null);
    this.props.updateLocation(null)
    console.log(this.props.post.photo);
    console.log(this.props.post.description);
    console.log(this.props.post.location);
}
// Iploading the post and navigating to the Home page
post = () => {
    this.props.uploadPost();
    this.props.navigation.navigate('Home');
    this.clear();
}
// when the tab is selected and there is no photo from the cmera opens the library
onWillFocus = () => {
    if(!this.props.post.photo){ this.openLibrary() }
}    

openLibrary = async () => {
    // asking permissions to use library
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status === 'granted') {
        // picking the image
        const image = await ImagePicker.launchImageLibraryAsync()
        if(!image.cancelled){
            // uploading the image to the storage 
            const url = await this.props.uploadPhoto(image)
            // getting back the url
            this.props.updatePhoto(url)
            url ? this.props.navigation.goBack() : this.props.navigation.navigate('Home')
        }
        // if cancelled navigate Home
        else { this.props.navigation.navigate('Home') }
    }
}
// Using user's coords showing modal with locations nearby
setLocation = (location) => {
    const place = {
        name: location.name,
        coords: {
            lat: location.geometry.location.lat,
            lng: location.geometry.location.lng 
        }
    }
    this.setState({ showModal: false })
    this.props.updateLocation(place)
}

getLocations = async () => {
    // asking permission to use Location
    const permission = await Permissions.askAsync(Permissions.LOCATION)
    if (permission.status === 'granted') 
    {
        // getting places nearby from google api using user's coords
        const location = await Location.getCurrentPositionAsync()
        const url = `${GOOGLE_API}?location=${location.coords.latitude},${location.coords.longitude}&rankby=distance&key=AIzaSyBChoLP3TUesj-aZB50hKut8jU3i2Qpzmc`
        const response = await fetch(url)
        const data = await response.json()
        this.setState({ locations: data.results })
    }
}


render(){
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <NavigationEvents onWillFocus={this.onWillFocus}/>
            <Modal onRequestClose={() => {}} animationType='slide' transparent={false} visible={this.state.showModal}>
                <SafeAreaView style={[styles.container, styles.center]}>
                    {/* displaying the places from the google places */}
                    <FlatList keyExtractor={(item) => item.id} data={this.state.locations} renderItem={({ item }) => (
                        <TouchableOpacity style={styles.border} onPress={() => this.setLocation(item)}>
                            <Text style={styles.gray}>{item.name}</Text>
                            <Text style={styles.gray}>{item.vicinity}</Text>
                        </TouchableOpacity>
                    )}/> 
                </SafeAreaView>
            </Modal>
             {/* displaying the picture */}
            <Image style={styles.postPhoto} source={{uri: this.props.post.photo}}/>
             {/* description input */}
            <TextInput style={styles.border} value={this.props.post.description} 
                onChangeText={text => this.props.updateDescription(text)} placeholder='Description'/>
            {/* on press make the modat visible to pick a place nearby */}
            { this.state.locations.length > 0 ? 
            <TouchableOpacity style={styles.border} onPress={() => this.setState({ showModal: true })}>
                <Text style={styles.gray}>{this.props.post.location ? this.props.post.location.name : 'Add a Location'}</Text>
            </TouchableOpacity> : null
            }
             {/* submit button */}
            <TouchableOpacity style={styles.button} onPress={this.post}> 
                <Text>Post</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}
} 

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators ({ updateDescription, uploadPost, updateLocation, uploadPhoto, updatePhoto }, dispatch)
}

const mapStateToProps = (state) => {
    return {
      post: state.post,
      user: state.user
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Post);
  