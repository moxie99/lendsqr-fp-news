/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

type titleProps = {title: string};
const Header = ({title}: titleProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={{
          height: 30,
          width: 30,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color={'black'} />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          lineHeight: 28,
          color: 'black',
          position: 'absolute',
          left: '40%',
        }}>
        {title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    marginTop: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%',
  },
});
