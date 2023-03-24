/* eslint-disable @typescript-eslint/no-unused-vars */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ParentNavigator from './src/navigation/ParentNavigation';
import codePush, {UpdateDialog} from 'react-native-code-push';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './redux/store';
// Define a custom update dialog
const customDialog: UpdateDialog = {
  appendReleaseDescription: true,
  descriptionPrefix: '\n\nChange log:\n',
  mandatoryContinueButtonLabel: 'Update Now',
  mandatoryUpdateMessage:
    'A new update is available. Install it to continue using the app.',
  optionalIgnoreButtonLabel: 'Later',
  optionalInstallButtonLabel: 'Update',
  optionalUpdateMessage:
    'A new update is available. Would you like to install it now?',
  title: 'Update Available',
};

function checkForUpdates() {
  codePush?.sync({
    updateDialog: customDialog,
    installMode: codePush.InstallMode.IMMEDIATE,
  });
}

export default function App() {
  useEffect(() => {
    checkForUpdates();
  }, []);
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
