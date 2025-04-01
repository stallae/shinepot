import React from 'react';
import useTheme from '../../../hooks/useTheme.tsx';
import {Image, Text, View} from 'react-native';
import logoSmallDark from '../../../assets/images/logo/logoSmallDark.png';
import logoSmallLight from '../../../assets/images/logo/logoSmallLight.png';
import useColors from '../../../hooks/useColors.tsx';

const LogoHorizontal = () => {
  const theme = useTheme();
  const {colors} = useColors();
  const logoSource = theme === 'dark' ? logoSmallDark : logoSmallLight;
  return (
    <View className="flex-row">
      <Image source={logoSource} />
      <Text
        className="text-2xl mt-1 mx-1 ml-1"
        style={{
          color: colors.textPrimary,
          fontFamily: 'HeptaSlab-Bold',
        }}>
        Shine
      </Text>
      <Text
        className="text-2xl mt-1"
        style={{
          color: colors.textPrimary,
          fontFamily: 'HeptaSlab-SemiBold',
        }}>
        pot
      </Text>
    </View>
  );
};

export default LogoHorizontal;
