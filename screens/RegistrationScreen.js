import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../firebase-config';
import crashlytics from '@react-native-firebase/crashlytics';

const url =
  'https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://d2vvqscadf4c1f.cloudfront.net/JsOiEO3LRQiPDyVDCgLu_Fotolia_98658521_Subscription_Monthly_M.jpg';
const imgLogin =
  'https://www.pngplay.com/wp-content/uploads/1/Register-PNG-Royalty-Free-Photo.png';
const RegistrationScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [accessToken, setAccessToken] = React.useState(null);
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('account created');
        crashlytics().log(`User has signed in`);
        const user = userCredential.user;
        setAccessToken(user?.stsTokenManager?.accessToken);
        console.log(user);
        navigation.navigate('SocialMedia');
      })
      .catch(error => {
        Alert.alert(error);
        crashlytics().recordError(error);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: url}}
        style={[styles.image, StyleSheet.absoluteFill]}
      />

      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{opacity: 0.9, backgroundColor: '#c7c1df', borderRadius: 10}}>
          <View style={styles.login}>
            <Image source={{uri: imgLogin}} style={styles.profileImage} />
            <View>
              <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>
                E-mail
              </Text>
              <TextInput
                onChangeText={text => setEmail(text)}
                style={styles.input}
                placeholder="adeolusegun99@gmail.com"
              />

              <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>
                Password
              </Text>
              <TextInput
                onChangeText={text => setPassword(text)}
                style={styles.input}
                placeholder="password"
                secureTextEntry={true}
              />
              <TouchableOpacity
                onPress={handleCreateAccount}
                style={[styles.button, {backgroundColor: '#12ede8'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  login: {
    width: 350,
    height: '60%',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 200,
    height: 50,
    resizeMode: 'cover',
    marginVertical: 30,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20,
    color: 'black',
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
});
