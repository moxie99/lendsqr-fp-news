/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../components/Header';

const NewsWebPage = () => {
  const {
    params: {url},
  } = useRoute();

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="News" />
      <WebView source={{uri: url}} />
    </SafeAreaView>
  );
};

export default NewsWebPage;
