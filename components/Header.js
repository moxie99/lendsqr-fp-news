import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';

const Header = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#39cdcc',
      }}>
      <View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: 'white',
            border: 1,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            borderColor: 'white',
          }}>
          lendsqr-fp
        </Text>
      </View>
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/2272/2272665.png',
        }}
        style={{height: 80, width: 80}}
      />
      <Icon
        name="dots-three-vertical"
        backgroundColor="maroon"
        size={30}
        style={{alignItems: 'center'}}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
