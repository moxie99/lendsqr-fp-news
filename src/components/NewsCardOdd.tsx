/* eslint-disable react-native/no-inline-styles */
import {Text, View, Image} from 'react-native';
import React from 'react';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const NewsCard = ({item}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const navNewsDetails = () => {
    navigation.navigate('NewsDetails', {item});
  };

  return (
    <TouchableOpacity
      onPress={navNewsDetails}
      style={{alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          width: '97%',
          height: 200,
          backgroundColor: 'white',
          borderRadius: 10,
          marginVertical: insets.top * 0.2,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          gap: 10,
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              color: 'black',
              fontSize: 12,
              fontWeight: '600',
              marginVertical: insets.top * 0.05,
            }}>
            {item?.title}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontWeight: '600',
              marginVertical: insets.top * 0.05,
            }}>
            {item?.topic}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontWeight: '600',
              marginVertical: insets.top * 0.05,
            }}>
            {item?.author}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: 'black',
              marginVertical: insets.top * 0.05,
            }}>
            {item?.clean_url}
          </Text>
          <Text>{item?.published_date}</Text>
        </View>
        <Image
          source={{
            uri: item?.media
              ? item?.media
              : 'https://th.bing.com/th/id/R.44f16943e8e600e3063dfc7d5a35992a?rik=zlhvP8W1QDUZLw&pid=ImgRaw&r=0',
          }}
          style={{width: 150, height: 150}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default NewsCard;
