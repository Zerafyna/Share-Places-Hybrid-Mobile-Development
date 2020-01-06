import { StyleSheet, Dimensions } from 'react-native';
const {width} = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
    },
    center:{
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    space: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    left: {
      alignItems: 'flex-start',
    },
    bold: {
      fontWeight: 'bold',
    },
    gray: {
      color: '#adadad',
    },
    small: {
      fontSize: 10,
    },
    button: {
      marginTop: 20,
      paddingVertical: 10,
      alignItems: 'center',
      borderColor: '#d3d3d3',
      borderWidth: 1,
      borderRadius: 5,
      width: 200,
    },
    facebookButton: {
      backgroundColor: '#3d5998',
      marginTop: 20,
      paddingVertical: 10,
      alignItems: 'center',
      borderColor: '#3d5998',
      borderWidth: 1,
      borderRadius: 5,
      width: 200,
    },
    border:{
      width: '85%',
      margin: 10,
      padding: 15,
      fontSize: 16,
      borderColor: '#d3d3d3',
      borderBottomWidth: 1,
      textAlign: 'center',
    },
    postPhoto: {
      height: 250,
      width: width,
    },
    upic: {
      height: 50,
      width: 50,
      borderRadius: 25,
      marginVertical: 3,
      marginHorizontal: 6,
    },
    cameraButton: {
      height: 60, 
      width: 60,
      borderRadius: 30,
      alignSelf: 'center',
      backgroundColor: '#fff',
      marginBottom: 45,
    },
    mrgBottom:{
      marginBottom: 15,
    },
    mrgTop:{
      marginTop: 15,
    },
    mrgHoriz:{
      marginHorizontal: 10,
    },
    roundImage: {
      width: 40, 
      height: 40,
      borderRadius: 20,
      margin: 5,
      backgroundColor: '#adadad'
    },
    roundImageBig: {
      width: 100, 
      height: 100,
      borderRadius: 50,
      margin: 5,
      backgroundColor: '#adadad',
      marginBottom: 20,
    },
    buttonSmall: {
      margin: 10,
      padding: 5,
      alignItems: 'center',
      borderColor: '#d3d3d3',
      borderWidth: 1,
      borderRadius: 5,
      width: 125
    },
    txtBig:{
      fontSize: 16,
      marginTop: 8,
    },
    signup:{
      fontSize: 18,
      color: '#4682b4',
    }
  });
  