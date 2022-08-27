import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import axios from 'axios';

const HomeScreen = () => {
  const [news, setNews] = React.useState([]);
  React.useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://free-news.p.rapidapi.com/v1/search',
      params: {q: 'Elon Musk', lang: 'en'},
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

  console.log('**************************');
  console.log(news);
  console.log('**************************');
  return (
    <View>
      <FlatList
        data={news}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 0.8,
              marginBottom: 5,
              marginTop: 5,
            }}
          />
        )}
        renderItem={({item: {media, published_date, topic, title}, index}) => {
          if (index % 4 === 0) {
            return (
              <TouchableOpacity
                style={{
                  width: '100%',
                  backgroundColor: '#def5f5',
                }}>
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
                backgroundColor: '#f8f9fa',
              }}>
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
              </View>
              <View>
                <Image
                  source={{uri: media}}
                  style={{height: 150, width: 150, resizeMode: 'cover'}}
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
