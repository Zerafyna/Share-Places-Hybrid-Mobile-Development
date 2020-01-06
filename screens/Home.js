// Erica Moisei //
import React from 'react';
import {Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPosts, likePost, unlikePost } from '../actions/post';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

class Home extends React.Component {
  // getting the posts
  componentDidMount(){
    this.props.getPosts()
  }
  // liking the post 
  likePost = (post) => {
    const { uid } = this.props.user
    if(post.likes.includes(uid)){
      this.props.unlikePost(post)
    } else{
      this.props.likePost(post)
    }
  }
  // navigating to the map to see the location
  navigateMap = (item) => {
    this.props.navigation.navigate('Map', { location: item.postLocation })
  }
  // displaying all the posts with its information
  render() {
    if(this.props.post === null) return null
      return (
        <View style={styles.container}>
          <FlatList
            onRefresh={() => this.props.getPosts()}
            refreshing={false}
            data = {this.props.post.feed}
            keyExtractor={(item) => item.id}
            renderItem = {({item}) => {
            const liked = item.likes.includes(this.props.user.uid)
              return (
              <View style={styles.mrgBottom}>
                <View style={[styles.row, styles.center]}>
                  <View style={[styles.row, styles.center]}>
                    {/* User picture  */}
                    <Image style={styles.upic} source={{uri: item.photo}}/>
                    <View>
                      {/* User name */}
                      <Text style={styles.bold}>{item.userName}</Text>
                      {/* Date  */}
                      <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
                      {/* Location that navigates to the Map view  */}
                      <TouchableOpacity onPress={() => this.navigateMap(item)} >
                        <Text>{item.postLocation ? item.postLocation.name : null}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {/* Displaying photo, Like/Unlike post on press  */}
                <TouchableOpacity onPress={() => this.likePost(item)}>
                  <Image style={styles.postPhoto} source={{uri: item.postPhoto}}/>
                </TouchableOpacity>
                {/* Like icon  */}
                <View style={styles.row}>
                  <Ionicons style={{marginVertical:8, marginHorizontal: 10}}  color={liked ? '#db565b' : '#000'}
                    name={item.likes.includes(this.props.user.uid) ? 'ios-heart' : 'ios-heart-empty'} size={25} /> 
                </View>
                {/* Post description  */}
                <Text style={{marginHorizontal:10}}>{item.postDescription}</Text>
  
              </View>
            )}
          }
          />
        </View> 
      );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ getPosts, likePost, unlikePost }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

