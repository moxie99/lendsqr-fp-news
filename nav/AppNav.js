import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SingleNewsScreen from '../screens/SingleNewsScreen';
import RegistrationScreen from '../screens/RegistrationScreen';

import Header from '../components/Header';
import SocialMediaLogin from '../screens/SocialMediaLogin';

const Stack = createNativeStackNavigator();
const AppNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        // options={{headerTitle: () => <Header title="Login" />}}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        // options={{headerTitle: () => <Header title="Registration" />}}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SingleNews"
        component={SingleNewsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SocialMedia"
        component={SocialMediaLogin}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNav;
