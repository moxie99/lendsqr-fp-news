/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {Alert} from 'react-native';
import {signInWithEmailAndPassword} from '@firebase/auth';
import {collection, doc, getDoc} from '@firebase/firestore';
import {onLoginPress} from '../src/screens/login/LoginScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

describe('onLoginPress', () => {
  let signInWithEmailAndPasswordMock;
  let getDocMock;
  let AlertMock;
  let navigationMock;

  beforeEach(() => {
    signInWithEmailAndPasswordMock = jest.fn(() =>
      Promise.resolve({user: {uid: '123'}}),
    );
    getDocMock = jest.fn(() =>
      Promise.resolve({exists: true, data: () => ({})}),
    );
    AlertMock = {alert: jest.fn()};
    navigationMock = {navigate: jest.fn()};
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should show alert when password length is less than 8 and email is not valid', () => {
    const password = '1234567';
    const isValidEmail = false;

    onLoginPress({
      password,
      isValidEmail,
      signInWithEmailAndPassword: signInWithEmailAndPasswordMock,
      Alert: AlertMock,
    });

    expect(signInWithEmailAndPasswordMock).not.toHaveBeenCalled();
    expect(getDocMock).not.toHaveBeenCalled();
    expect(AlertMock.alert).toHaveBeenCalledWith(
      'Email or password is invalid',
    );
    expect(navigationMock.navigate).not.toHaveBeenCalled();
  });

  test('should show alert when user does not exist', async () => {
    const password = '12345678';
    const isValidEmail = true;

    getDocMock.mockReturnValueOnce(Promise.resolve({exists: false}));

    await onLoginPress({
      password,
      isValidEmail,
      signInWithEmailAndPassword: signInWithEmailAndPasswordMock,
      getDoc: getDocMock,
      Alert: AlertMock,
      navigation: navigationMock,
    });

    expect(signInWithEmailAndPasswordMock).toHaveBeenCalled();
    expect(getDocMock).toHaveBeenCalled();
    expect(AlertMock.alert).toHaveBeenCalledWith(
      'User does not exist anymore.',
    );
    expect(navigationMock.navigate).not.toHaveBeenCalled();
  });

  test('should show alert when there is an error', async () => {
    const password = '12345678';
    const isValidEmail = true;
    const error = 'error message';

    signInWithEmailAndPasswordMock.mockRejectedValueOnce(error);

    await onLoginPress({
      password,
      isValidEmail,
      signInWithEmailAndPassword: signInWithEmailAndPasswordMock,
      Alert: AlertMock,
    });

    expect(signInWithEmailAndPasswordMock).toHaveBeenCalled();
    expect(getDocMock).not.toHaveBeenCalled();
    expect(AlertMock.alert).toHaveBeenCalledWith(error);
    expect(navigationMock.navigate).not.toHaveBeenCalled();
  });

  test('should navigate to Google screen when login is successful', async () => {
    const password = '12345678';
    const isValidEmail = true;
    const user = {};

    getDocMock.mockReturnValueOnce(
      Promise.resolve({exists: true, data: () => user}),
    );

    await onLoginPress({
      password,
      isValidEmail,
      signInWithEmailAndPassword: signInWithEmailAndPasswordMock,
      getDoc: getDocMock,
      Alert: AlertMock,
      navigation: navigationMock,
    });

    expect(signInWithEmailAndPasswordMock).toHaveBeenCalled();
    expect(getDocMock).toHaveBeenCalled();
    expect(AlertMock.alert).toHaveBeenCalledWith('Log in Successful');
    expect(navigationMock.navigate).toHaveBeenCalledWith('Google', {user});
  });
});
