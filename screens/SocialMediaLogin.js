import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
// import {signInWithPopup} from 'firebase/auth';
// import {auth, provider} from '../config';
import {useNavigation} from '@react-navigation/native';

import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '225887237392-vco8rt4vd7l4cndto26ni2cosrv2n94p.apps.googleusercontent.com',
});
const SocialMediaLogin = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(false);

  const googleSignIn = async () => {
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   console.log(userInfo);
    // } catch (error) {
    //   console.log(error);
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     // user cancelled the login flow
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     // operation (e.g. sign in) is in progress already
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     // play services not available or outdated
    //   } else {
    //     // some other error happened
    //   }
    // }

    // Get the users ID token
    setLoading(true);
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = await auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const res = await auth().signInWithCredential(googleCredential);

    console.log(res);
    setLoading(false);
  };

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <View>
        <Text style={{paddingBottom: 20, fontSize: 18, fontWeight: 'bold'}}>
          Social Media Sign Up
        </Text>
      </View>
      {/* <TouchableOpacity
        style={{
          width: 350,
          height: 50,
          borderRadius: 10,
          borderColor: 'green',
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}
        onPress={googleSignIn}>
        <Image
          source={{uri: 'https://i.stack.imgur.com/TiQ81.png'}}
          style={{width: 30, height: 30, resizeMode: 'cover'}}
        />
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'green'}}>
          Continue with Google
        </Text>
      </TouchableOpacity> */}
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={googleSignIn}
        disabled={loading}
      />
      ;
    </View>
  );
};

export default SocialMediaLogin;

const styles = StyleSheet.create({});
