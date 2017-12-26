import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import * as firebase from 'firebase'

import 'firebase/auth'

const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

firebase.initializeApp({
  apiKey: 'AIzaSyCDNyaPGVk5jQQl_KHWFyIWymOr4Ghg3VA',
  authDomain: 'torchbearer-bcad6.firebaseapp.com',
  databaseURL: 'https://torchbearer-bcad6.firebaseio.com',
  projectId: 'torchbearer-bcad6',
  storageBucket: '',
  messagingSenderId: '207074754074',
})
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig) // firebase instance as first argument
)(createStore)

const rootReducer = combineReducers({
  firebase: firebaseReducer,
})

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)

if (!firebase.auth().currentUser) {
  firebase.auth().signInAnonymously()
}

export { store as default }
