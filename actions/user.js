// Erica Moisei //
import firebase from 'firebase';
import db from '../config/firebase';

// redux update of the props usind dispatch
export const updateEmail = (email) => {
    return {type: 'UPDATE_EMAIL', payload: email}
}
//
// redux update of the props usind dispatch
export const updatePassword = (password) => {
    return {type: 'UPDATE_PASSWORD', payload: password}
}
// redux update of the props usind dispatch
export const updateUserName = (userName) => {
    return {type: 'UPDATE_USERNAME', payload: userName} 
}
// redux update of the props usind dispatch
export const updateBio = (bio) => {
    return {type: 'UPDATE_BIO', payload: bio}
}
// redux update of the props usind dispatch
export const updatePhoto = (photo) => {
	return {type: 'UPDATE_PHOTO_U', payload: photo}
}

// Creating a new user using Firebase Autentication and passing user info into the database
export const signup = () => {
    return async ( dispatch, getState ) =>  {
        try{
            const {email, password, userName, bio, photo} = getState().user; 
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
            if(response.user.uid){
                const user = {
                    uid: response.user.uid,
                    email: email,
                    userName: userName,
                    bio: bio || ' ',
                    photo: photo || '',
                    token: null,
                }
                db.collection('users').doc(response.user.uid).set(user)
                dispatch({type: 'LOGIN', payload: user})
            }
           
        } catch (e){
            alert(e);
        }
    }
}
// Using Facebook login within the Firebase using FB token and savong data to our database
export const facebookLogin = () => {
    return async (dispatch) =>  {
        try{
            const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('##########');
            if(type === 'success') {
                const credential = await firebase.auth.FacebookAuthProvider.credential(token);
                const response = await firebase.auth().signInWithCredential(credential);
                const user = await db.collection('users').doc(response).get();
                if(!user === 'success'){
                    const user = {
                        uid: response.uid,
                        email: response.email,
                        userName: response.displayName,
                        bio: '',
                        photo: response.photoURL,
                        token: null,
                    }
                    db.collection('users').doc(response.user.uid).set(user)
                    dispatch({type: 'LOGIN', payload: user})
                    
                } else {
                    dispatch(getUser(response.uid))
                }
            }
        } catch (e){
            console.log(e);
        }
    }
}

// Using Firebase Autentication to login the user with email and password
export const login = () => {
    return async ( dispatch, getState ) =>  {
        try{
            const {email, password} = getState().user; 
            const response = await firebase.auth().signInWithEmailAndPassword(email, password);
            const user = response.user.providerData[0];
            dispatch(getUser(user.uid));
        } catch (e){
            console.log(e);
        }
    }
}

// Getting user info from Firebase 
export const getUser = (uid) => {
    return async ( dispatch, getState ) =>  {
        try{
            const user = await db.collection('users').doc(uid).get()
            dispatch({type: 'LOGIN', payload: user.data()})
        } catch (e){
            alert(e);
        }
    }
}

// Updating user info in the database
export const updateUser = () => {
    return async ( dispatch, getState )  => {
      const { uid, username, bio, photo } = getState().user
      try {
        db.collection('users').doc(uid).update({
          username: username || ' ',
          bio: bio || ' ',
          photo: photo || ' '
        })
      } catch(e) {
        alert(e)
      }
    }
  }
  
