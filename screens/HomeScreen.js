import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  _ScrollView,
} from 'react-native';
import React from 'react';

import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  // holding the data from  the backend
  const [news, setNews] = React.useState([]);

  // for the navigation
  const navigation = useNavigation();

  // for truncating the number of characters for the summary
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }
  // hook for the api call and keeping state of data fetched
  React.useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://free-news.p.rapidapi.com/v1/search',
      params: {q: 'Technology', lang: 'en'},
      headers: {
        'X-RapidAPI-Key': 'c7bc0687aamsh2e4a2d3412c98c7p103bc6jsnd82c441a1fc8',
        'X-RapidAPI-Host': 'free-news.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log('===============');
        console.log(response.data.articles[7]);
        setNews([...response?.data?.articles]);
        console.log('===============');
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <View>
      <TouchableOpacity
        style={{
          width: 300,
          height: 50,
          backgroundColor: 'red',
          borderRadius: 20,
        }}>
        <Text style={{color: 'white'}}>Crash</Text>
      </TouchableOpacity>
      <FlatList
        data={news}
        keyExtractor={item => item?._id}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 0.8,
              marginBottom: 5,
              marginTop: 5,
            }}
          />
        )}
        renderItem={({
          item: {media, published_date, topic, title, summary},
          index,
        }) => {
          let summaryText = truncate(summary, 100);
          if (index % 4 === 0) {
            return (
              <TouchableOpacity
                style={{
                  width: '100%',
                  backgroundColor: '#def5f5',
                }}
                onPress={() => {
                  navigation.navigate('SingleNews', {
                    media,
                    published_date,
                    topic,
                    title,
                    summary,
                  });
                }}
                key={index}>
                <View>
                  <Image
                    source={{uri: media}}
                    style={{height: 250, width: '100%', resizeMode: 'cover'}}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    padding: 10,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      paddingBottom: 10,
                      textTransform: 'capitalize',
                      fontSize: 12,
                    }}>
                    {title}
                  </Text>
                  <Text
                    style={{
                      paddingBottom: 10,
                      textTransform: 'capitalize',
                      fontSize: 12,
                    }}>
                    {topic}
                  </Text>
                  <Text
                    style={{
                      paddingBottom: 10,
                      textTransform: 'capitalize',
                      fontSize: 12,
                    }}>
                    {published_date}
                  </Text>
                  <Text
                    style={{
                      paddingBottom: 10,
                      textTransform: 'capitalize',
                      fontSize: 12,
                    }}>
                    {summaryText}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0.4,
                shadowRadius: 3,
                elevation: 5,
              }}
              onPress={() => {
                navigation.navigate('SingleNews', {
                  media,
                  published_date,
                  topic,
                  title,
                  summary,
                });
              }}
              key={index}>
              <View
                style={{
                  flex: 1,
                  padding: 10,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    paddingBottom: 10,
                    textTransform: 'capitalize',
                    fontSize: 12,
                  }}>
                  {title}
                </Text>
                <Text
                  style={{
                    paddingBottom: 10,
                    textTransform: 'capitalize',
                    fontSize: 12,
                  }}>
                  {topic}
                </Text>
                <Text
                  style={{
                    paddingBottom: 10,
                    textTransform: 'capitalize',
                    fontSize: 12,
                  }}>
                  {published_date}
                </Text>
                <Text
                  style={{
                    paddingBottom: 10,
                    textTransform: 'capitalize',
                    fontSize: 12,
                  }}>
                  {summaryText}
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingRight: 10,
                }}>
                <Image
                  source={{uri: media}}
                  style={{
                    height: 150,
                    width: 150,
                    resizeMode: 'cover',
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
