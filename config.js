// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {GoogleAuthProvider, getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBhXtG5I6KlaQNLTP6QA9KQdTzmI7665IA',
  authDomain: 'lendsqr-fp-news.firebaseapp.com',
  projectId: 'lendsqr-fp-news',
  storageBucket: 'lendsqr-fp-news.appspot.com',
  messagingSenderId: '225887237392',
  appId: '1:225887237392:web:cd5170f733f31f8d12e195',
  measurementId: 'G-W1FN8WLEWH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
