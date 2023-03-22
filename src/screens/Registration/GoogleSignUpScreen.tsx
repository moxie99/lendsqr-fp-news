/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {TabScreenParamList} from '../../navigation/TabNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParentStackParamList} from '../../navigation/ParentNavigation';
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {auth} from '../../firebase/config';
import {provider} from '../../firebase/config';
type EntryScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabScreenParamList>,
  NativeStackNavigationProp<ParentStackParamList, 'Login'>
>;

type EntryScreenRouteProp = RouteProp<ParentStackParamList, 'Register'>;
const GoogleSignUpScreen = () => {
  const navigation = useNavigation<EntryScreenNavigationProp>();

  const {
    params: {user},
  } = useRoute<EntryScreenRouteProp>();

  console.log(user);

  const googleHandler = async () => {
    provider.setCustomParameters({prompt: 'select_account'});
    signInWithPopup(auth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token);
        // The signed-in user info.
        const user = result.user;
        // redux action? --> dispatch({ type: SET_USER, user });
        console.log(user);
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        console.log(email);
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log(credential);
      });
  };
  const {
    params: {},
  } = useRoute<EntryScreenRouteProp>();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity
        onPress={googleHandler}
        style={{
          height: 50,
          width: 200,
          backgroundColor: '#AFEEEE',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text style={{color: 'black'}}>Google SignUp</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignUpScreen;
