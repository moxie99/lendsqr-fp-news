/* eslint-disable no-bitwise */
/* eslint-disable react-native/no-inline-styles */
import {TouchableOpacity, View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar} from '@rneui/themed';
import {Dialog, ListItem} from '@rneui/themed';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';

const NewsHeader = () => {
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const handleUser = async () => {
    const user = await AsyncStorage.getItem('user');
    const currentUser = JSON.parse(user);
    setUsers(currentUser);
  };

  useEffect(() => {
    handleUser();
  }, []);

  const handlePress = () => {
    throw new Error('This is a runtime error!');
  };

  const toggleDialog = () => {
    setVisible(!visible);
  };
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUsers(null);
      setVisible(false);
      navigation.navigate('Login');
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error(error);
    }
  };

  const userlist = [
    {
      name: users?.user?.name || 'name model',
      avatar:
        users?.user?.photo ||
        'https://res-5.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/drg9bxadhql5l1e1zth0',
      email: users?.user?.email || 'xyz@gmail.com',
      action: 'Log Out',
    },
  ];

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

      <TouchableOpacity onPress={toggleDialog}>
        <Avatar size={64} rounded source={{uri: users?.user?.photo}} />
      </TouchableOpacity>
      <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
        <Dialog.Title title="Account" />
        {userlist.map((l, i) => (
          <View key={i}>
            <ListItem
              containerStyle={{
                marginHorizontal: -10,
                borderRadius: 8,
              }}
              onPress={toggleDialog}>
              <Avatar rounded source={{uri: l.avatar}} />
              <ListItem.Content>
                <ListItem.Title style={{fontWeight: '700'}}>
                  {l.name}
                </ListItem.Title>
                <ListItem.Subtitle>{l.email}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <TouchableOpacity
              onPress={signOut}
              style={{
                width: 100,
                height: 30,
                backgroundColor: '#0080ff',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text style={{color: '#fff', fontSize: 12, fontWeight: '600'}}>
                {l.action}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </Dialog>
    </View>
  );
};

export default NewsHeader;
