import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import AppNav from './nav/AppNav';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  return (
    <NavigationContainer>
      <AppNav />
      <StatusBar barStyle="light-content" translucent={true} />
    </NavigationContainer>
    // <LoginScreen />
  );
};

export default App;

const styles = StyleSheet.create({});
