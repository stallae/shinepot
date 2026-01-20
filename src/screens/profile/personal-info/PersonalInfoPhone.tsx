import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { X } from 'phosphor-react-native';
import useColors from '../../../hooks/useColors';
import BackButton from '../../../components/global/buttons/backButton';
import { useNavigation } from '@react-navigation/native';
import { PROFILE_DATA } from '../../../_mock/profile';

const PersonalInfoPhone = () => {
  const { colors } = useColors();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.primary }}>
      <View className="absolute top-20 left-2 z-10">
        <BackButton icon={<X />} onPress={navigation.goBack} />
      </View>
      <View className="px-6 pt-24">
        <Text className="text-3xl font-bold mb-2" style={{ color: colors.textPrimary }}>
          Phone number
        </Text>
        <Text className="text-base" style={{ color: colors.textPrimary, opacity: 0.7 }}>
          {PROFILE_DATA.phone}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PersonalInfoPhone;


