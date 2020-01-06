// Erica Moisei //
import uuid from 'uuid';
import firebase from 'firebase';
import { ImageManipulator } from 'expo';

// Uploading photo in the storage to get the url so it can be placed in the post as picture url
export const uploadPhoto = (image) => {
  return async (dispatch) => {
    try {
      //compressing the image to save datausage while testing 
      const resize = await ImageManipulator.manipulateAsync(image.uri, [], { format: 'jpg', compress: 0.1 })
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = () => resolve(xhr.response)
        xhr.responseType = 'blob'
        xhr.open('GET', resize.uri, true)
        xhr.send(null)
      });
      // uploading to the Firebase storage and generation uuid version 4 as uid
      const uploadTask = await firebase.storage().ref().child(uuid.v4()).put(blob)
      const downloadURL = await uploadTask.ref.getDownloadURL()
      return downloadURL // returning url
    } catch(e) {
      console.error(e)
    }
  }
}
