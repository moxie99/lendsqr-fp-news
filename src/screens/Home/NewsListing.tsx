/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {SearchBar} from '@rneui/themed';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator, SafeAreaView, Text, View} from 'react-native';
import './styles';
import {useSearchEnterpriseQuery} from '../../../redux/api';
import NewsHeader from '../../components/NewsHeader';

type AvatarData = {
  image_url: string;
};
export default function NewsListing() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const {data, isLoading, error} = useSearchEnterpriseQuery({
    q: 'Sport',
    lang: 'en',
    sort_by: 'relevancy',
    page: '1',
  });

  console.log('data', data?.articles[2]);

  const updateSearch = (search: React.SetStateAction<string>) => {
    setSearch(search);
  };

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
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
        marginHorizontal: '3%',
      }}>
      <NewsHeader />
      <SearchBar
        placeholder="Search News..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={{
          borderRadius: 10,
          backgroundColor: '#0080ff',
        }}
        inputContainerStyle={{
          backgroundColor: 'white',
          width: '100%',
        }}
      />
    </View>
  );
}
