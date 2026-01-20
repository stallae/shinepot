import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { X, EnvelopeSimple, DeviceMobileCamera, House, User } from 'phosphor-react-native';
import useColors from '../../../hooks/useColors';
import BackButton from '../../../components/global/buttons/backButton';
import ProfileMenuButton from '../../../components/profile/profileMenuButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, ROUTES } from '../../../navigation/roots';
import { PROFILE_DATA } from '../../../_mock/profile';

const PersonalInformation = () => {
  const { colors } = useColors();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.primary }}>
      <View className="absolute top-20 left-2 z-10">
        <BackButton icon={<X />} onPress={navigation.goBack} />
      </View>

      <View className="px-6 pt-24">
        <Text className="text-3xl font-bold mb-8" style={{ color: colors.textPrimary }}>
          Profile
        </Text>

        <View className="gap-6">
          <ProfileMenuButton
            title="Personal information"
            icon={User}
            route={ROUTES.PersonalInfoDetails}
            description="Manage your personal information"
            onPress={() => navigation.navigate(ROUTES.PersonalInfoDetails)}
          />
          <ProfileMenuButton
            title="Email"
            icon={EnvelopeSimple}
            route={ROUTES.UpdateEmail}
            description={PROFILE_DATA.email}
            onPress={() => navigation.navigate(ROUTES.UpdateEmail)}
          />
          <ProfileMenuButton
            title="Phone number"
            icon={DeviceMobileCamera}
            route={ROUTES.PersonalInfoPhone}
            description={PROFILE_DATA.phone}
            onPress={() => navigation.navigate(ROUTES.PersonalInfoPhone)}
          />
          <ProfileMenuButton
            title="Address details"
            icon={House}
            route={ROUTES.PersonalInfoAddress}
            description="Manage your address details"
            onPress={() => navigation.navigate(ROUTES.PersonalInfoAddress)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PersonalInformation;
