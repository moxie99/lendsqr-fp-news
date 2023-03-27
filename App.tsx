/* eslint-disable @typescript-eslint/no-unused-vars */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ParentNavigator from './src/navigation/ParentNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import codePush from 'react-native-code-push';

// const CODE_PUSH_OPTIONS = {
//   checkFrequency: CodePush?.CheckFrequency?.ON_APP_START,
// };

// const syncWithCodePush = () => {
//   Alert.alert('CodePush Sync Status');
// };
const App = () => {
  // useEffect(() => {
  //   CodePush.sync(
  //     {installMode: CodePush.InstallMode.IMMEDIATE},
  //     syncWithCodePush,
  //   );
  // }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <ParentNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};
export default codePush(App);
