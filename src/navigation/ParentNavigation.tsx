import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import LoginScreen from '../screens/login/LoginScreen';
import RegistrationScreen from '../screens/Registration/RegistrationScreen';
import GoogleSignUpScreen from '../screens/Registration/GoogleSignUpScreen';
import NewsHeader from '../components/NewsHeader';
import NewsListing from '../screens/Home/NewsListing';
import NewsDetails from '../screens/Home/NewsDetails';
import NewsWebPage from '../screens/Home/NewsWebView';

export type ParentStackParamList = {
  Main: {user: userGoogleSignReturn};
  Login: {};
  Register: undefined;
  Google: undefined;
  NewsHeader: undefined;
  NewsListing: {q: string};
  NewsDetails: {};
  NewsWebPage: {
    url: string;
  };
};
const ParentStack = createNativeStackNavigator<ParentStackParamList>();
const ParentNavigator = () => {
  const [users, setUsers] = useState(null);

  const handleUser = async () => {
    const user = await AsyncStorage.getItem('user');
    const currentUser = JSON.parse(user);
    setUsers(currentUser);
  };

  React.useEffect(() => {
    handleUser();
  }, []);

  return (
    <ParentStack.Navigator>
      {users ? (
        <ParentStack.Group>
          <ParentStack.Screen name="Main">
            {props => <TabNavigator {...props} extraData={users} />}
          </ParentStack.Screen>
          <ParentStack.Screen name="NewsHeader" component={NewsHeader} />
          <ParentStack.Screen name="NewsListing" component={NewsListing} />
          <ParentStack.Screen name="NewsDetails" component={NewsDetails} />
          <ParentStack.Screen name="NewsWebPage" component={NewsWebPage} />
          <ParentStack.Screen name="Login" component={LoginScreen} />
          <ParentStack.Screen name="Register" component={RegistrationScreen} />
          <ParentStack.Screen name="Google" component={GoogleSignUpScreen} />
        </ParentStack.Group>
      ) : (
        <ParentStack.Group>
          <ParentStack.Screen name="Login" component={LoginScreen} />
          <ParentStack.Screen name="Register" component={RegistrationScreen} />
          <ParentStack.Screen name="Google" component={GoogleSignUpScreen} />
          <ParentStack.Screen name="NewsHeader" component={NewsHeader} />
          <ParentStack.Screen name="NewsListing" component={NewsListing} />
          <ParentStack.Screen name="NewsDetails" component={NewsDetails} />
          <ParentStack.Screen name="NewsWebPage" component={NewsWebPage} />
          <ParentStack.Screen name="Main">
            {props => <TabNavigator {...props} extraData={users} />}
          </ParentStack.Screen>
        </ParentStack.Group>
      )}
    </ParentStack.Navigator>
  );
};

export default ParentNavigator;
