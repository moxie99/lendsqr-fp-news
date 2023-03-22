import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
//import ModalScreen from '../screens/ModalScreen';
//import OrderScreen from '../screens/OrderScreen';
import LoginScreen from '../screens/login/LoginScreen';
import RegistrationScreen from '../screens/Registration/RegistrationScreen';

// declaring types for the different screen groups based on the data that will be passed into them when

import {decode, encode} from 'base-64';
import GoogleSignUpScreen from '../screens/Registration/GoogleSignUpScreen';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

export type ParentStackParamList = {
  Main: {user: user};
  //Order: {order: Order};
  Login: {};
  Register: undefined;
  Google: {user: user};
};
const ParentStack = createNativeStackNavigator<ParentStackParamList>();
const ParentNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  return (
    <ParentStack.Navigator>
      {/* bottom tab Navogation */}

      {user ? (
        <ParentStack.Group>
          <ParentStack.Screen name="Main" component={TabNavigator} />
        </ParentStack.Group>
      ) : (
        <ParentStack.Group>
          <ParentStack.Screen
            // options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <ParentStack.Screen
            // options={{ headerShown: false }}
            name="Register"
            component={RegistrationScreen}
          />
          <ParentStack.Screen
            // options={{ headerShown: false }}
            name="Google"
            component={GoogleSignUpScreen}
          />
        </ParentStack.Group>
      )}
    </ParentStack.Navigator>
  );
};

export default ParentNavigator;