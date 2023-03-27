/* eslint-disable @typescript-eslint/no-unused-vars */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ParentNavigator from './src/navigation/ParentNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <ParentNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
