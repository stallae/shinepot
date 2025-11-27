import React from 'react';
import useColors from '../../../hooks/useColors.tsx';
import {View} from 'react-native';
import {LogoHorizontal, ProfilePicture} from '../../index.ts';

const Header = () => {
  const {colors} = useColors();
  return (
    <View
      className={'w-full fixed top-0 h-24 justify-around'}
      style={{backgroundColor: colors.secondary}}>
      <View className={'ml-7 flex-row justify-between items-center'}>
        <LogoHorizontal />
        <ProfilePicture size={50} shape="square" className="m-5" />
      </View>
    </View>
  );
};

export default Header;
