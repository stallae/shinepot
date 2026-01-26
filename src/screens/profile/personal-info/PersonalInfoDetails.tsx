import * as React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { X } from 'phosphor-react-native';
import useColors from '../../../hooks/useColors';
import BackButton from '../../../components/global/buttons/backButton';
import GeneralInput from '../../../components/global/inputs/generalImput';
import WideButton from '../../../components/global/buttons/wideButton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getUser, updateUser } from '../../../services/userService';
import auth from '@react-native-firebase/auth';
import { User } from '../../../interfaces/auth';

import { getDateParts, parseDateFromParts } from '../../../utils/dateHelpers';

const PersonalInfoDetails = () => {
  const { colors } = useColors();
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);

  // Form State
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [day, setDay] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [year, setYear] = React.useState('');

  const fetchUser = React.useCallback(async () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
        const userData = await getUser(currentUser.uid);
        if (userData) {
            setFirstName(userData.firstName || '');
            setLastName(userData.lastName || '');
            
            const { day, month, year } = getDateParts(userData.birthday);
            setDay(day);
            setMonth(month);
            setYear(year);
        }
    }
    setLoading(false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
        fetchUser();
    }, [fetchUser])
  );

  const handleSave = async () => {
      const currentUser = auth().currentUser;
      if (!currentUser) return;

      const birthday = parseDateFromParts(day, month, year);

      const updates: Partial<User> = {
          firstName,
          lastName,
          birthday: birthday || undefined,
      };

      try {
          await updateUser(currentUser.uid, updates);
          navigation.goBack();
      } catch (error) {
          console.error("Failed to save profile", error);
          // Optional: Show alert
      }
  };

  if (loading) {
      return (
          <SafeAreaView className="flex-1 justify-center items-center" style={{ backgroundColor: colors.primary }}>
              <Text style={{ color: colors.textPrimary }}>Loading...</Text>
          </SafeAreaView>
      );
  }

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
          <WideButton text="Save" onPress={handleSave} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PersonalInfoDetails;


