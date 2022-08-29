import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';

const SingleNewsScreen = () => {
  const navigation = useNavigation();
  const {
    params: {media, published_date, topic, summary, title},
  } = useRoute();

  return (
    <ScrollView
      contentContainerStyle={{backgroundColor: 'white', height: '100%'}}>
      <View style={{position: 'relative'}}>
        <Image
          source={{uri: media}}
          style={{width: '100%', height: 500, padding: 4, background: 'gray'}}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 30,
            left: 5,
            padding: 2,
            backgroundColor: 'gray',
            borderRadius: 50,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-left" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: 'white'}}>
        <View style={{paddingHorizontal: 4, paddingTop: 20}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{title}</Text>
        </View>
        <View style={{paddingHorizontal: 4, paddingTop: 4}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{topic}</Text>
        </View>
        <View style={{paddingHorizontal: 4, paddingTop: 4}}>
          <Text style={{fontSize: 12, fontWeight: 'bold'}}>{summary}</Text>
        </View>
        <View style={{paddingHorizontal: 4, paddingTop: 4}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {published_date}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SingleNewsScreen;

const styles = StyleSheet.create({});
