/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {logo} from '../../assets/images';
import {auth, db} from '../../firebase/config';
import {doc, collection, setDoc} from 'firebase/firestore';
import styles from './styles';

type EntryScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabScreenParamList>,
  NativeStackNavigationProp<ParentStackParamList, 'Register'>
>;

type EntryScreenRouteProp = RouteProp<ParentStackParamList, 'Register'>;

export default function RegistrationScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // useEffect(() => {
  //   logMiddleware('screen-view', {screen_name: 'Register'});
  // }, []);

  const navigation = useNavigation<EntryScreenNavigationProp>();
  const onFooterLinkPress = () => {
    navigation.navigate('Login', {});
  };

  const {
    params: {},
  } = useRoute<EntryScreenRouteProp>();

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match.");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((response: {user: {uid: any}}) => {
        const uid = response?.user?.uid;
        const data = {
          id: uid,
          email,
          fullName,
          phoneNumber,
        };
        const usersRef = collection(db, 'users');
        const userDoc = doc(usersRef, uid);
        setDoc(userDoc, data)
          .then(() => {
            Alert.alert('Registration Successful');
            navigation.navigate('Google', {user: data});
          })
          .catch((error: any) => {
            Alert.alert(error);
          });
      })
      .catch((error: any) => {
        Alert.alert(error);
      });

    // logMiddleware('register_with_data', {
    //   email: email,
    //   password: password,
    //   fullName: fullName,
    //   phoneNumber: phoneNumber,
    // });

    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPhoneNumber('');
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{flex: 1, width: '100%'}}
        keyboardShouldPersistTaps="always">
        <Image style={styles.logo} source={logo} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Phone Number"
          onChangeText={text => setPhoneNumber(text)}
          value={phoneNumber}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}>
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
