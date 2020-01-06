// Erica Moisei //
import { combineReducers } from 'redux';

const user = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, ...action.payload}
    case 'UPDATE_EMAIL':
      return {...state, email: action.payload}
    case 'UPDATE_PASSWORD':
      return {...state, password: action.payload}
    case 'UPDATE_USERNAME':
      return {...state, userName: action.payload}
    case 'UPDATE_BIO':
      return {...state, bio: action.payload}
      case 'UPDATE_PHOTO_U':
      return { ...state, photo: action.payload }
    default:
      return state
  }
}

const post = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_PHOTO':
      return { ...state, photo: action.payload }
    case 'UPDATE_DESCRIPTION':
      return { ...state, description: action.payload }
    case 'UPDATE_LOCATION':
      return { ...state, location: action.payload }
    case 'GET_POSTS':
      return { ...state, feed: action.payload }
    default:
      return state
  }
}

const modal = (state = null, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, modal: action.payload }
    case 'CLOSE_MODAL':
      return { ...state, modal: false }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user, post, modal,
})

export default rootReducer