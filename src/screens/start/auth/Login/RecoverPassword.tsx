import { View, Text, SafeAreaView } from "react-native";
import { ROUTES, ScreenProps } from "../../../../navigation/types";
import React, { useState } from "react";
import { ArrowLeft } from "phosphor-react-native";
import useColors from "../../../../hooks/useColors";
import {GeneralInput, WideButton, BackButton} from "../../../../components";

const RecoverPassword: React.FC<ScreenProps> = ({navigation}) => {
  const {colors} = useColors();
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView
    className="flex-1 items-center"
    style={{backgroundColor: colors.primary}}>
        <View className="absolute top-20 left-2">
          <BackButton icon={<ArrowLeft />} onPress={navigation.goBack} />
        </View>

        <View className="flex-1 w-11/12 justify-center">
          <Text
            className="font-inter text-3xl font-bold mb-3"
            style={{color: colors.textPrimary}}>
            Recover Password
          </Text>
          
          <Text 
            className="font-inter text-lg mb-8 color-gray-250">
            Enter your email address and we will send you instructions to reset your password.
          </Text>

          <GeneralInput
            label="Email address"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChange={setEmail}
          />

          <View className="mt-6">
            <WideButton
              text="Send Recovery Email"
              onPress={() => navigation.navigate(ROUTES.LoginOtp)}
              isDisabled={!email}
            />
          </View>
        </View>
    </SafeAreaView>
  );
};

export default RecoverPassword;