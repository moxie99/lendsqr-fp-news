/* eslint-disable @typescript-eslint/no-unused-vars */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ParentNavigator from './src/navigation/ParentNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <ParentNavigator />
    </NavigationContainer>
  );
}
