/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import {SearchBar} from '@rneui/themed';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import './styles';
import {useSearchEnterpriseQuery} from '../../../redux/api';
import NewsHeader from '../../components/NewsHeader';
import {useSelector} from 'react-redux';
import NewsCard from '../../components/NewsCardOdd';
import IndicatorExample from '../../components/NewsSlider';
import {useDispatch} from 'react-redux';

type AvatarData = {
  q?: string;
};
export default function NewsListing({q}: AvatarData) {
  const insets = useSafeAreaInsets();

  // useEffect(() => {
  //   logMiddleware('screen-view', {screen_name: 'NewsListing'});
  // }, []);

  const {data, isLoading, error} = useSearchEnterpriseQuery({
    q: q,
    lang: 'en',
    sort_by: 'relevancy',
    page: '1',
  });

  console.log(data);
  if (isLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} animating color={'#0080ff'} />
      </View>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <Text>Error: {error.message} Hello Eror</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        marginHorizontal: '3%',
      }}>
      <NewsHeader />
      {/* <TextInput
        style={{
          width: '97%',
          height: 50,
          borderWidth: 1,
          borderColor: '#0080ff',
          paddingHorizontal: 10,
          borderRadius: 10,
          marginBottom: insets.bottom * 0.2,
        }}
        placeholder="Enter text here"
      /> */}

      <IndicatorExample />

      {data &&
        data?.articles?.map((item: {_id: React.Key | null | undefined}) => (
          <ScrollView key={item._id}>
            <NewsCard item={item} />
          </ScrollView>
        ))}
    </ScrollView>
  );
}
