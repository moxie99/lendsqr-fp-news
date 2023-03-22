/* eslint-disable react-native/no-inline-styles */
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
import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {logo} from '../../assets/images';
import styles from './styles';

type EntryScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabScreenParamList>,
  NativeStackNavigationProp<ParentStackParamList, 'Login'>
>;

type EntryScreenRouteProp = RouteProp<ParentStackParamList, 'Login'>;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<EntryScreenNavigationProp>();
  const onFooterLinkPress = () => {
    navigation.navigate('Register', {});
  };

  const onLoginPress = () => {};

  const {
    params: {},
  } = useRoute<EntryScreenRouteProp>();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{flex: 1, width: '100%'}}
        keyboardShouldPersistTaps="always">
        <Image style={styles.logo} source={logo} />
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
        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
