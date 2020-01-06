// Erica Moisei //
import firebase from 'firebase';
import db from '../config/firebase';
import uuid from 'uuid';

// redux update of the props usind dispatch
export const updateDescription = (input) => {
	return {type: 'UPDATE_DESCRIPTION', payload: input}
}
// redux update of the props usind dispatch
export const updatePhoto = (input) => {
	return {type: 'UPDATE_PHOTO', payload: input}
}
// redux update of the props usind dispatch
export const updateLocation = (input) => {
	return {type: 'UPDATE_LOCATION', payload: input}
}

// Sending gata to Firebase
export const uploadPost = () => {
    return async ( dispatch, getState ) =>  {
        try{
            const { post, user } = getState();
            const id = uuid.v4();
            const upload = {
                id: id,
                postPhoto: post.photo,
                postDescription: post.description || ' ',
                postLocation: post.location  || ' ',
                uid: user.uid,
                photo: user.photo  || ' ',
                userName: user.userName,
                likes: [],
                date: new Date().getTime(),
            }
            db.collection('posts').doc(id).set(upload)
        } catch (e){
            console.error(e);
        }
    }
}

// Getting the post from Firebase
export const getPosts = () => {
	return async (dispatch, getState) => {
		try {
			const posts = await db.collection('posts').get()
			
			let array = []
			posts.forEach((post)=>{ array.push(post.data())})
			dispatch({type: 'GET_POSTS', payload: array})
		} catch (e) {
            console.error(e);
		}
	}
}
// Sending liker uid to the Firebase placing in to Likes array in the post
export const likePost = (post) => {
    return (dispatch, getState) => {
        const { uid, userName, photo } = getState().user;
        try{
            db.collection('posts').doc(post.id).update({
                likes: firebase.firestore.FieldValue.arrayUnion(uid)
            })
            
            db.collection('activity').doc().set({
                postId: post.id,
                postPhoto: post.postPhoto,
                likerId: uid,
                likerPhoto: photo,
                likerName: userName,
                uid: post.uid,
                date: new Date().getTime(),
                type: 'LIKE',
            })
            dispatch(getPosts())
        } catch(e){
            console.error(e);
        }
    }
}
// Taking the user uid from the array in the post Firebase
export const unlikePost = (post) => {
    return async (dispatch, getState) => {
        const { uid } = getState().user;
        try{
            db.collection('posts').doc(post.id).update({
                likes: firebase.firestore.FieldValue.arrayRemove(uid)
            })
            const query = await db.collection('activity').where('postId', '==', post.id).where('likerId', '==', uid).get()
            query.forEach((response) => {
                console.log(response)
                response.ref.delete()
            })
            dispatch(getPosts());
        } catch(e){
            console.error(e);
        }
    }
}