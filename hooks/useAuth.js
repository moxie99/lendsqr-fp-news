import {StyleSheet, Text, View} from 'react-native';
import React, {createContext, useContext} from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../firebase-config';
const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [userToken, setUserToken] = React.useState(null);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = async (email, password) => {
    console.log({email, password});
    await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('account created');
        setUserToken();
        const user = userCredential.user;
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSignIn = async (email, password) => {
    console.log({email, password});
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('Signed in!!');
        const user = userCredential.user;
        setUserToken();
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <AuthContext.Provider
      value={{handleCreateAccount, handleSignIn, userToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
