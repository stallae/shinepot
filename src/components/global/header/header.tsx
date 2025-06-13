import React from 'react';
import useColors from '../../../hooks/useColors.tsx';
import {View} from 'react-native';
import LogoHorizontal from '../logo/logoHorizontal.tsx';
import ProfilePicture from '../profile-picture/profilePicture.tsx';

const Header = () => {
  const {colors} = useColors();
  return (
    <View
      className={'w-full absolute h-24 top-0 justify-around'}
      style={{backgroundColor: colors.secondary}}>
      <View className={'ml-7 flex-row justify-between items-center'}>
        <LogoHorizontal />
        <ProfilePicture size={50} shape="square" />
      </View>
    </View>
  );
};

export default Header;
