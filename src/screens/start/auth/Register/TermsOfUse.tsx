import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { ScreenProps } from "../../../../navigation/types";
import React from "react";
import { ArrowLeft } from "phosphor-react-native";
import BackButton from "../../../../components/global/buttons/backButton";
import useColors from "../../../../hooks/useColors";

const TermsOfUse: React.FC<ScreenProps> = ({navigation}) => {
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
                  Terms of Use
              </Text>
              <Text className="font-inter text-lg font-semibold color-gray-250">
                Please read these terms carefully before using the application.
              </Text>

              <Text className="font-inter text-xl font-bold mt-6 mb-2" style={{color: colors.textPrimary}}>
                1. Account Terms
              </Text>
              <Text className="font-inter text-lg font-semibold color-gray-250">
                You must be 13 years or older to use this service. You must provide accurate information during registration.
              </Text>

              <Text className="font-inter text-xl font-bold mt-6 mb-2" style={{color: colors.textPrimary}}>
                2. Usage Guidelines
              </Text>
              <Text className="font-inter text-lg font-semibold color-gray-250">
                You are responsible for all activity that occurs under your account. You must not use the service for any illegal purposes.
              </Text>

              <Text className="font-inter text-xl font-bold mt-6 mb-2" style={{color: colors.textPrimary}}>
                3. Service Modifications
              </Text>
              <Text className="font-inter text-lg font-semibold color-gray-250">
                We reserve the right to modify or discontinue the service at any time without notice.
              </Text>

              <Text className="font-inter text-xl font-bold mt-6 mb-2" style={{color: colors.textPrimary}}>
                4. Privacy & Data
              </Text>
              <Text className="font-inter text-lg font-semibold color-gray-250">
                Your use of the service is also governed by our Privacy Policy. You consent to the collection and use of your data as described therein.
              </Text>

              <Text className="font-inter text-xl font-bold mt-6 mb-2" style={{color: colors.textPrimary}}>
                5. Intellectual Property
              </Text>
              <Text className="font-inter text-lg font-semibold color-gray-250">
                All content and functionality within the service remains our exclusive property. You may not copy, modify, or distribute our content without permission.
              </Text>

              <Text className="font-inter text-xl font-bold mt-6 mb-2" style={{color: colors.textPrimary}}>
                6. Termination
              </Text>
              <Text className="font-inter text-lg font-semibold color-gray-250">
                We may terminate or suspend your account at any time for violations of these terms or for any other reason at our discretion.
              </Text>

              <Text className="font-inter text-xl font-bold mt-6 mb-2" style={{color: colors.textPrimary}}>
                7. Limitation of Liability
              </Text>
              <Text className="font-inter text-lg font-semibold color-gray-250">
                We are not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
              </Text>

              <Text className="font-inter text-xl font-bold mt-6 mb-2" style={{color: colors.textPrimary}}>
                8. Changes to Terms
              </Text>
              <Text className="font-inter text-lg font-semibold color-gray-250">
                We may update these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
              </Text>

          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default TermsOfUse;