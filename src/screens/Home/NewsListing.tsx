/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {SearchBar} from '@rneui/themed';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text, View} from 'react-native';
import './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar} from '@rneui/themed';
import {ListItem} from '@rneui/themed';
import {Icon} from '@rneui/themed';
import {useSearchEnterpriseQuery} from '../../../redux/api';
type AvatarData = {
  image_url: string;
};
export default function NewsListing() {
  const [user, setUser] = useState(null);
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(false);

  const {data, isLoading, error} = useSearchEnterpriseQuerys('Elon Musk');
  const handleUser = async () => {
    const user = await AsyncStorage.getItem('user');
    const currentUser = JSON.parse(user);
    setUser(currentUser);
  };
  const updateSearch = search => {
    setSearch(search);
  };

  React.useEffect(() => {
    handleUser();
  }, []);

  console.log(user?.user);
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
        marginHorizontal: '3%',
      }}>
      <Avatar size={64} rounded source={{uri: user?.user?.photo}} />
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
          innerWidth: '100%',
        }}
      />
      <ListItem.Accordion
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
      </ListItem.Accordion>
    </View>
  );
}
