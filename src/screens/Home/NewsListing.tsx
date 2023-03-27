/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {SearchBar} from '@rneui/themed';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import './styles';
import {useSearchEnterpriseQuery} from '../../../redux/api';
import NewsHeader from '../../components/NewsHeader';
import NewsCard from '../../components/NewsCardOdd';
import IndicatorExample from '../../components/NewsSlider';

type AvatarData = {
  q?: string;
};
export default function NewsListing({q}: AvatarData) {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  // useEffect(() => {
  //   logMiddleware('screen-view', {screen_name: 'NewsListing'});
  // }, []);

  const {data, isLoading, error} = useSearchEnterpriseQuery({
    q: q,
    lang: 'en',
    sort_by: 'relevancy',
    page: '1',
  });

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
    <ScrollView
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
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

      {/* <IndicatorExample /> */}

      {data &&
        data?.articles?.map(item => (
          <ScrollView key={item._id}>
            <NewsCard item={item} />
          </ScrollView>
        ))}
    </ScrollView>
  );
}
