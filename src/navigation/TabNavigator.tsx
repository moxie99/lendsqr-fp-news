/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import Sports from '../screens/Home/Sports';
import Technology from '../screens/Home/Technology';
import Health from '../screens/Home/Health';
import Finance from '../screens/Home/Finance';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import CommIcon from 'react-native-vector-icons/MaterialCommunityIcons';
export type TabScreenParamList = {
  Sports: undefined;
  Technology: undefined;
  Finance: undefined;
  Health: undefined;
};
const Tab = createBottomTabNavigator<TabScreenParamList>();

const TabNavigator = props => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0080ff',
        tabBarInactiveTintColor: '#D3D3D3',
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Sports') {
            return (
              <MaterialIcon
                name="sports-football"
                size={30}
                color={focused ? '#0080ff' : '#D3D3D3'}
              />
            );
          } else if (route.name === 'Technology') {
            return (
              <CommIcon
                name="cpu-64-bit"
                size={30}
                color={focused ? '#0080ff' : '#D3D3D3'}
              />
            );
          } else if (route.name === 'Health') {
            return (
              <Ionicons
                name="fitness"
                size={30}
                color={focused ? '#0080ff' : '#D3D3D3'}
              />
            );
          } else if (route.name === 'Finance') {
            return (
              <CommIcon
                name="finance"
                size={30}
                color={focused ? '#0080ff' : '#D3D3D3'}
              />
            );
          }
        },
      })}>
      <Tab.Screen name="Sports" component={Sports} />
      <Tab.Screen name="Technology" component={Technology} />
      <Tab.Screen name="Health" component={Health} />
      <Tab.Screen name="Finance" component={Finance} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
