import  { useState, useEffect } from 'react';
import * as React from 'react'
import useColors from '../../../hooks/useColors';
import {View} from 'react-native';
import {LogoHorizontal, ProfilePicture} from '../../index';
import { getUser } from '../../../services/userService';
import auth from '@react-native-firebase/auth';

const Header = () => {
  const {colors} = useColors();
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
      const fetchUser = async () => {
          const currentUser = auth().currentUser;
          if (currentUser) {
              const userData = await getUser(currentUser.uid);
              setPhotoUrl(userData?.photoURL || currentUser.photoURL || undefined);
          }
      };
      fetchUser();
  }, []);

  return (
    <View
      className={'w-full fixed top-0 h-24 justify-around'}
      style={{backgroundColor: colors.secondary}}>
      <View className={'ml-7 flex-row justify-between items-center'}>
        <LogoHorizontal />
        <ProfilePicture size={50} shape="circle" className="m-5" source={{ uri: photoUrl || 'https://via.placeholder.com/100' }} />
      </View>
    </View>
  );
};

export default Header;
