/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('screen');
const NewsDetails = () => {
  const {
    params: {item},
  } = useRoute();

  const navigation = useNavigation();

  const url = item.link;
  const navigateToNews = () => {
    navigation.navigate('NewsWebPage', {url: url});
  };

  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      contentContainerStyle={{
        marginHorizontal: '3%',
        marginTop: insets.top,
        marginBottom: insets.bottom * 3,
      }}
      showsVerticalScrollIndicator={false}>
      <Image
        source={{uri: item.media}}
        style={{width: width * 0.9, height: height * 0.5}}
      />
      <View style={{marginTop: insets.top}}>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontWeight: '400',
            marginVertical: 10,
          }}>
          Title: {item.title}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontWeight: '400',
            marginVertical: 10,
          }}>
          Topic:{item.topic}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontWeight: '400',
            marginVertical: 10,
          }}>
          Author: {item.author}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontWeight: '400',
            marginVertical: 10,
          }}>
          Authors: {item.authors}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontWeight: '400',
            marginVertical: 10,
          }}>
          Clean Url: {item.clean_url}
        </Text>
        <TouchableOpacity
          style={{
            height: 50,
            width: 120,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0080ff',
            borderRadius: 10,
          }}
          onPress={navigateToNews}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
            Read Full News
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontWeight: '400',
            marginVertical: 10,
          }}>
          Country: {item.country}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontWeight: '400',
            marginVertical: 10,
          }}>
          Excerpt: {item.excerpt}
        </Text>

        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontWeight: '400',
            marginVertical: 10,
          }}>
          Date: {item.published_date}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontWeight: '400',
            marginVertical: 10,
          }}>
          Summary: {item.summary}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontWeight: '400',
            marginVertical: 10,
          }}>
          Twitter: {item.twitter_account}
        </Text>
      </View>
    </ScrollView>
  );
};

export default NewsDetails;
