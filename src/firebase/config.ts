/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// const firebaseConfig = {
//   apiKey: 'AIzaSyDz_RYgxS51cMbnCRJv1mCBL2JCma87MRQ',
//   authDomain: 'your-auth-domain-b1234.firebaseapp.com',
//   databaseURL: 'https://your-database-name.firebaseio.com',
//   projectId: 'lendsqr-fp-news-42ce3',
//   storageBucket: 'lendsqr-fp-news-42ce3.appspot.com',
//   messagingSenderId: '12345-insert-yourse',
//   appId: 'insert yours: 1:1234:web:ee873bd1234c0deb7eba61ce',
// };

const firebaseConfig = {
  apiKey: 'AIzaSyANUVC3RQE_AP3dnYrNIvpAzLjbYKODTeI',
  authDomain: 'lendsqr-fp-news-42ce3.firebaseapp.com',
  projectId: 'lendsqr-fp-news-42ce3',
  storageBucket: 'lendsqr-fp-news-42ce3.appspot.com',
  messagingSenderId: '828725666522',
  appId: '1:828725666522:web:7378a4b4fa41e5907d3be3',
  measurementId: 'G-N0NE3BYX2H',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
