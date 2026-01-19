import React from 'react';
import useColors from '../../../hooks/useColors.tsx';
import {View} from 'react-native';
import {LogoHorizontal, ProfilePicture} from '../../index.ts';
import { PROFILE_DATA } from '../../../_mock/profile';
const Header = () => {
  const {colors} = useColors();
  return (
    <View
      className={'w-full fixed top-0 h-24 justify-around'}
      style={{backgroundColor: colors.secondary}}>
      <View className={'ml-7 flex-row justify-between items-center'}>
        <LogoHorizontal />
        <ProfilePicture size={50} shape="circle" className="m-5" source={{ uri: PROFILE_DATA.avatarUrl }} />
      </View>
    </View>
  );
};

export default Header;
