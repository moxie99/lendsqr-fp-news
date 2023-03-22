/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Text, View} from 'react-native';
import {RootStackParamList} from '../../../App';
import './styles';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export default function NewsListing({
  navigation,
  route,
}: ProfileScreenNavigationProp) {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}
