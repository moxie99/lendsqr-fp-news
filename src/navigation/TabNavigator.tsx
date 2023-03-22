/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import Sports from '../screens/Home/Sports';
import Technology from '../screens/Home/Technology';
import Health from '../screens/Home/Health';
import Finance from '../screens/Home/Finance';
import {Icon} from '@rneui/themed';

export type TabScreenParamList = {
  Sports: undefined;
  Technology: undefined;
  Finance: undefined;
  Health: undefined;
};
const Tab = createBottomTabNavigator<TabScreenParamList>();

const TabNavigator = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#510400',
        tabBarInactiveTintColor: '#D3D3D3',
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Sports') {
            return (
              <Icon
                name="sc-telegram"
                type="evilicon"
                color={focused ? '#045D5D' : '#D3D3D3'}
              />
            );
          } else if (route.name === 'Health') {
            return (
              <Icon
                name="sc-telegram"
                type="evilicon"
                color={focused ? '#510400' : '#D3D3D3'}
              />
            );
          } else if (route.name === 'Technology') {
            return (
              <Icon
                name="sc-telegram"
                type="evilicon"
                color={focused ? '#510400' : '#D3D3D3'}
              />
            );
          } else if (route.name === 'Finance') {
            return (
              <Icon
                name="sc-telegram"
                type="evilicon"
                color={focused ? '#510400' : '#D3D3D3'}
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
