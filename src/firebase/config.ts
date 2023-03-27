/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
//import { getAnalytics } from "firebase/analytics";


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
//export const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();
// export const logMiddleware = (eventName: any, eventParams = {}) => {
//   logEvent(analytics, eventName, eventParams);
// };
provider.setCustomParameters({ prompt: 'select_account' });


