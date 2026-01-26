import * as React from 'react';
import useTheme from '../../../hooks/useTheme';
import {Image, Text, View} from 'react-native';
import logoDark from '../../../assets/images/logo/logoDark.png';
import logoLight from '../../../assets/images/logo/logoLight.png';
import useColors from '../../../hooks/useColors';

const LogoHorizontal = () => {
  const theme = useTheme();
  const {colors} = useColors();
  const logoSource = theme === 'dark' ? logoDark : logoLight;
  return (
    <View className="flex-row">
      <Image
        source={logoSource}
        style={{height: 30, width: 30, objectFit: 'contain'}}
      />
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
