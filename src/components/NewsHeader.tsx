/* eslint-disable react-native/no-inline-styles */
import {TouchableOpacity, View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar} from '@rneui/themed';
import {ListItem} from '@rneui/themed';
import {Icon} from '@rneui/themed';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const NewsHeader = () => {
  const [users, setUsers] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const insets = useSafeAreaInsets();
  const handleUser = async () => {
    const user = await AsyncStorage.getItem('user');
    const currentUser = JSON.parse(user);
    setUsers(currentUser);
  };

  useEffect(() => {
    handleUser();
  }, []);

  console.log(users);

  const handlePress = () => {
    throw new Error('This is a runtime error!');
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: insets.bottom,
      }}>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          backgroundColor: '#0080ff',
          alignItems: 'center',
          justifyContent: 'center',
          width: 100,
          height: 50,
          borderRadius: 10,
        }}>
        <Text style={{color: '#fff', fontWeight: '600', fontSize: 16}}>
          Crash App
        </Text>
      </TouchableOpacity>

      <View>
        <Text style={{fontWeight: '600', fontSize: 16, color: '#0080ff'}}>
          Welcome 👋
        </Text>
        <Text style={{fontWeight: '600', fontSize: 20}}>
          {users?.user?.name}
        </Text>
      </View>

      <TouchableOpacity>
        <Avatar size={64} rounded source={{uri: users?.user?.photo}} />
      </TouchableOpacity>

      {/* <ListItem.Accordion
        content={
          <>
            <Icon name="place" size={30} />
            <ListItem.Content>
              <ListItem.Title>List Accordion</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}>
        {Object?.entries(user?.user).map((l, i) => (
          <ListItem key={i} onPress={log} bottomDivider>
            <Avatar title={l.name[0]} source={{uri: l.avatar_url}} />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </ListItem.Accordion> */}
    </View>
  );
};

export default NewsHeader;
