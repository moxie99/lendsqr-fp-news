import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type NewsCard = {
  image: string;
  description: string;
  title: string;
};
const NewsCardEven = ({image, description, title}: NewsCard) => {
  return (
    <View>
      <Text>NewsCardEven</Text>
    </View>
  );
};

export default NewsCardEven;
