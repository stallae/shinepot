import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { ScreenProps } from "../../../../navigation/types";
import React from "react";
import { ArrowLeft } from "phosphor-react-native";
import BackButton from "../../../../components/global/buttons/backButton";
import useColors from "../../../../hooks/useColors";

const PrivacyPolicy: React.FC<ScreenProps> = ({navigation}) => {
  const {colors} = useColors();
  return (
    <SafeAreaView
    className="flex-1"
    style={{backgroundColor: colors.primary}}>
        <View className="absolute top-20 left-2 z-10">
        <BackButton icon={<ArrowLeft />} onPress={navigation.goBack} />
        </View>
        <ScrollView className="flex-1">
          <View className="w-11/12 mx-auto mt-28 pb-10" >
              <Text className="font-inter text-2xl mb-3 font-bold" style={{color: colors.textPrimary}}>
                  1. Personal Data Provided by the User
              </Text>
              <Text className="font-inter text-lg font-semibold color-gray-250">
              We collect various types of data to enhance your experience and improve our services. This includes:
              </Text>
              <Text className="font-inter text-lg font-bold mt-3 color-gray-250">
              Personal Data Provided by the User
              </Text>
              <Text className="font-inter text-lg mt-3 font-semibold color-gray-250">
              When you create an account or interact with our services, you may provide us with:
              </Text>
              <Text className="font-inter text-lg mt-3 font-bold color-gray-250">
              - Name
              </Text> 
              <Text className="font-inter text-lg font-semibold color-gray-250">
              (for personalization and identification purposes)
              </Text>
              <Text className="font-inter text-lg mt-3 font-bold color-gray-250">
              - Email Address
              </Text> 
              <Text className="font-inter text-lg font-semibold color-gray-250">
              (for account management and notifications)
              </Text>
              <Text className="font-inter text-lg mt-3 font-bold color-gray-250">
              - Profile Picture
              </Text> 
              <Text className="font-inter text-lg font-semibold color-gray-250">
              (optional, if uploaded by the user)
              </Text>
              <Text className="font-inter text-lg mt-3 font-bold color-gray-250">
              - Messages
              </Text> 
              <Text className="font-inter text-lg font-semibold color-gray-250">
              (end-to-end encrypted, not accessible by us)
              </Text>
              <Text className="font-inter text-2xl mt-8 mb-3 font-bold" style={{color: colors.textPrimary}}>
                  2. Data Collected Automatically
              </Text>
              <Text className="font-inter text-lg font-semibold color-gray-250">
              We also collect certain data automatically to improve functionality and security, including:
              </Text>
              <Text className="font-inter text-lg mt-3 font-bold color-gray-250">
              - Device Information
              </Text> 
              <Text className="font-inter text-lg font-semibold color-gray-250">
              (if permitted, to provide system-based features, and app version for troubleshooting)
              </Text>
              <Text className="font-inter text-lg mt-3 font-bold color-gray-250">
              - Location Data
              </Text> 
              <Text className="font-inter text-lg font-semibold color-gray-250">
              (if permitted, to provide location-based features)
              </Text>
              <Text className="font-inter text-lg mt-3 font-bold color-gray-250">
              - Usage Data
              </Text> 
              <Text className="font-inter text-lg font-semibold color-gray-250">
              (interactions with the app, such as feature usage and frequency)
              </Text>
              <Text className="font-inter text-2xl mt-8 mb-3 font-bold" style={{color: colors.textPrimary}}>
                  3. How We Collect Data
              </Text>
              
              <Text className="font-inter text-lg mt-3 font-bold color-gray-250">
              - Provided by the User:
              </Text> 
              <Text className="font-inter text-lg font-semibold color-gray-250">
              When signing up, messaging or updating your profile.
              </Text>
              <Text className="font-inter text-lg mt-3 font-bold color-gray-250">
              - Automatically Collected:
              </Text> 
              <Text className="font-inter text-lg font-semibold color-gray-250">
              Through app analytics, cookies, and device permissions.
              </Text>

              <Text className="font-inter text-2xl mt-8 mb-3 font-bold" style={{color: colors.textPrimary}}>
                  4. Data Usage
              </Text>
              <Text className="font-inter text-lg font-semibold color-gray-250">
              Your data is used for the following purposes:
              </Text>
              <Text className="font-inter text-lg mt-3 font-bold color-gray-250">
              - Service Provision
              </Text>
              <Text className="font-inter text-lg font-semibold color-gray-250">
              To operate, maintain and improve our services
              </Text>
              <Text className="font-inter text-lg mt-3 font-bold color-gray-250">
              - Security
              </Text>
              <Text className="font-inter text-lg font-semibold color-gray-250">
              To protect against unauthorized access and fraud
              </Text>

              <Text className="font-inter text-2xl mt-8 mb-3 font-bold" style={{color: colors.textPrimary}}>
                  5. Data Protection
              </Text>
              <Text className="font-inter text-lg font-semibold color-gray-250">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction or damage.
              </Text>

              <Text className="font-inter text-2xl mt-8 mb-3 font-bold" style={{color: colors.textPrimary}}>
                  6. Your Rights
              </Text>
              <Text className="font-inter text-lg font-semibold color-gray-250">
              You have the right to:
              </Text>
              <Text className="font-inter text-lg mt-3 font-bold color-gray-250">
              - Access your data
              </Text>
              <Text className="font-inter text-lg mt-3 font-bold color-gray-250">
              - Request data deletion
              </Text>
              <Text className="font-inter text-lg mt-3 font-bold color-gray-250">
              - Opt out of data collection
              </Text>
              <Text className="font-inter text-lg mt-3 font-bold color-gray-250">
              - Request data correction
              </Text>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy; 