import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {useNavigation} from '@react-navigation/native';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../firebase-config';

const url =
  'https://thumbs.dreamstime.com/b/team-work-technology-illustration-global-network-connection-background-185348211.jpg';
const imgLogin =
  'https://www.downloadclipart.net/medium/34252-login-button-blue-images.png';
const LoginScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [accessToken, setAccessToken] = React.useState(null);
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const moveToSignUp = () => {
    navigation.navigate('Registration');
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('Signed in!!');
        const user = userCredential.user;
        console.log(user);
        setAccessToken(user?.stsTokenManager?.accessToken);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
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
        <View style={{opacity: 0.9, backgroundColor: 'gray'}}>
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
            </View>
            <View>
              <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>
                Password
              </Text>
              <TextInput
                onChangeText={text => setPassword(text)}
                style={styles.input}
                placeholder="password"
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              onPress={handleSignIn}
              style={[styles.button, {backgroundColor: '#00CFEB89'}]}>
              <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={moveToSignUp}
              style={[styles.button, {backgroundColor: '#00CF'}]}>
              <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

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
    height: 500,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
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
