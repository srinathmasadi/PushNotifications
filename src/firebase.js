import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyCTeVnyw5HqndI4xr0R0A72uo864XaHazs",
  authDomain: "venturepact-856ee.firebaseapp.com",
  projectId: "venturepact-856ee",
  storageBucket: "venturepact-856ee.appspot.com",
  messagingSenderId: "208625655386",
  appId: "1:208625655386:web:0f9fc16bb73c3244998263",
  measurementId: "G-YX7P0LKB4C"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
