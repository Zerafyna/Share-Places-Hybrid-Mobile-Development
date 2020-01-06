// Erica Moisei //
import React from 'react';
import styles from '../styles';
import { connect } from 'react-redux';
import { Text, View, FlatList, ActivityIndicator, Image} from 'react-native';
import db from '../config/firebase';
import orderBy from 'lodash/orderBy';
import moment from 'moment';

class Activity extends React.Component {
	state = {
		activity: []
	}

  componentDidMount = () => {
    this.getActivity()
  }

  // getting activity for the logged in user from database
  getActivity = async () => {
  	let activity = []
    const query = await db.collection('activity').where('uid', '==', this.props.user.uid).get()
    query.forEach((response) => {
      activity.push(response.data())
    })
		this.setState({activity: orderBy(activity, 'date', 'desc')})
  }

  // Rendering list of information to display from the database response
  renderList = (item) => {
    switch(item.type) {
      case 'LIKE':
        return (         
          <View style={[styles.row, styles.space, styles.mrgBottom]}>
            <Image style={styles.roundImage} source={{uri: item.likerPhoto}}/>
            <View style={[styles.container, styles.left]}>
              <Text style={styles.bold}>{item.likerName}</Text>
              <Text style={styles.gray}>Liked Your Photo</Text>
              <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
            </View>
            <Image style={styles.roundImage} source={{uri: item.postPhoto}}/>
          </View>
        )
      default: null
    }
  }

  render() {
  	if (this.state.activity.length <= 0 ) return <ActivityIndicator style={styles.container}/>
    return (
    	<View style={{flex: 1}}>
        {/* Using FlatList to loop through the items in the response */}
				<FlatList
          onRefresh={() => this.getActivity()}
          refreshing={false}
				  data={this.state.activity}
				  keyExtractor={(item) => JSON.stringify(item.date)}
          renderItem={({ item }) =>  this.renderList(item)} />
			</View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Activity)