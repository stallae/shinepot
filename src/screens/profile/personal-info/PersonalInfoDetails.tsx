import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { X } from 'phosphor-react-native';
import useColors from '../../../hooks/useColors';
import BackButton from '../../../components/global/buttons/backButton';
import GeneralInput from '../../../components/global/inputs/generalImput';
import WideButton from '../../../components/global/buttons/wideButton';
import { useNavigation } from '@react-navigation/native';
import { PROFILE_DATA } from '../../../_mock/profile';

const PersonalInfoDetails = () => {
  const { colors } = useColors();
  const navigation = useNavigation();

  const [firstName, setFirstName] = React.useState(PROFILE_DATA.firstName ?? '');
  const [lastName, setLastName] = React.useState(PROFILE_DATA.lastName ?? '');

  const [day, setDay] = React.useState(() => {
    const parts = (PROFILE_DATA.birthday || '').split('-');
    return parts[2] ?? '';
  });
  const [month, setMonth] = React.useState(() => {
    const parts = (PROFILE_DATA.birthday || '').split('-');
    return parts[1] ?? '';
  });
  const [year, setYear] = React.useState(() => {
    const parts = (PROFILE_DATA.birthday || '').split('-');
    return parts[0] ?? '';
  });

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.primary }}>
      <View className="absolute top-20 left-2 z-10">
        <BackButton icon={<X />} onPress={navigation.goBack} />
      </View>

      <View className="flex-1 px-6 pt-24">
        <Text className="text-2xl font-bold mb-6" style={{ color: colors.textPrimary }}>
          Personal information
        </Text>

        <View className="gap-5">
          <GeneralInput
            label="First name:"
            placeholder="First name"
            keyboardType="default"
            value={firstName}
            onChange={setFirstName}
          />
          <GeneralInput
            label="Last name"
            placeholder="Last name"
            keyboardType="default"
            value={lastName}
            onChange={setLastName}
          />

          <View className="flex-row gap-3">
            <View className="flex-1">
              <GeneralInput
                label="Day"
                placeholder="DD"
                keyboardType="number-pad"
                value={day}
                onChange={setDay}
              />
            </View>
            <View className="flex-1">
              <GeneralInput
                label="Month"
                placeholder="MM"
                keyboardType="number-pad"
                value={month}
                onChange={setMonth}
              />
            </View>
            <View className="flex-1">
              <GeneralInput
                label="Year"
                placeholder="YYYY"
                keyboardType="number-pad"
                value={year}
                onChange={setYear}
              />
            </View>
          </View>
        </View>

        <View className="mt-auto pb-6">
          <WideButton text="Save" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PersonalInfoDetails;


