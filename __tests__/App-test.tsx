/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {Alert} from 'react-native';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from '@firebase/auth';
import {collection, doc, getDoc, setDoc} from '@firebase/firestore';
import {onLoginPress} from '../src/screens/login/LoginScreen';


// Note: test renderer must be required after react-native. This test is for logging in
import renderer from 'react-test-renderer';
import { onRegisterPress } from '../src/screens/Registration/RegistrationScreen';

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



// this test is for registration

jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

jest.mock('@firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock('@firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
}));

describe('onRegisterPress', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display an error message if passwords do not match', () => {
    const setPassword = jest.fn();
    const setConfirmPassword = jest.fn();

    const email = 'test@example.com';
    const password = 'password';
    const confirmPassword = 'wrongpassword';
    const fullName = 'Test User';
    const phoneNumber = '555-555-5555';

    onRegisterPress(
      email,
      password,
      confirmPassword,
      fullName,
      phoneNumber,
      setPassword,
      setConfirmPassword,
    );

    expect(Alert.alert).toHaveBeenCalledWith("Passwords don't match.");
    expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
    expect(collection).not.toHaveBeenCalled();
    expect(doc).not.toHaveBeenCalled();
    expect(setDoc).not.toHaveBeenCalled();
    expect(setPassword).toHaveBeenCalledWith('');
    expect(setConfirmPassword).toHaveBeenCalledWith('');
  });

  it('should register a new user and navigate to the Google screen on success', async () => {
    const setPassword = jest.fn();
    const setConfirmPassword = jest.fn();

    const email = 'test@example.com';
    const password = 'password';
    const confirmPassword = 'password';
    const fullName = 'Test User';
    const phoneNumber = '555-555-5555';

    const uid = '1234';
    const data = {
      id: uid,
      email,
      fullName,
      phoneNumber,
    };

    const usersRef = {};
    const userDoc = {};

    createUserWithEmailAndPassword.mockResolvedValue({user: {uid}});
    collection.mockReturnValue(usersRef);
    doc.mockReturnValue(userDoc);
    setDoc.mockResolvedValue();

    await onRegisterPress()
  }
},


// this test is for api call
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { renderHook } from '@testing-library/react-hooks';
import { useSearchEnterpriseQuery } from "../redux/api";

// Define mock response data
const mockData = {
  results: [
    { title: 'First article', content: 'Article content.' },
    { title: 'Second article', content: 'More article content.' },
  ],
};

// Define mock server that returns mock data
const server = setupServer(
  rest.get('https://api.newscatcherapi.com/v2/search', (req, res, ctx) => {
    return res(ctx.json(mockData));
  })
);

// Start the mock server before running the tests
beforeAll(() => server.listen());

// Stop the mock server after running the tests
afterAll(() => server.close());

describe('useSearchEnterpriseQuery', () => {
  it('returns the data and loading state from the API', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useSearchEnterpriseQuery({ q: 'test', lang: 'en' })
    );

    // The initial loading state should be true
    expect(result.current.isLoading).toBe(true);

    // Wait for the hook to finish loading
    await waitForNextUpdate();

    // The loading state should be false
    expect(result.current.isLoading).toBe(false);

    // The data should match the mock response data
    expect(result.current.data).toEqual(mockData.results);
  });
});
