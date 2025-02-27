import React from 'react';
import useTheme from '../../../hooks/useTheme.tsx';
import {Image, Text, View} from 'react-native';
import logoDark from '../../../assets/images/logo/logoDark.png';
import logoLight from '../../../assets/images/logo/logoLight.png';
import useColors from '../../../hooks/useColors.tsx';

const Logo = () => {
  const theme = useTheme();
  const {colors} = useColors();
  const logoSource = theme === 'dark' ? logoDark : logoLight;
  return (
    <View className="self-center items-center">
      <Image source={logoSource} />
      <Text
        className="text-2xl mt-1"
        style={{
          color: colors.textPrimary,
          fontFamily: 'HeptaSlab-Bold',
        }}>
        Shine
      </Text>
      <Text
        className="text-4xl"
        style={{
          color: colors.textPrimary,
          fontFamily: 'HeptaSlab-SemiBold',
        }}>
        pot
      </Text>
    </View>
  );
};

export default Logo;
