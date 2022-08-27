import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <SafeAreaView style={{backgroundColor: 'lightgray'}}>
      <Header />
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
