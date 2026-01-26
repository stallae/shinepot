import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList, ROUTES } from './roots';
import OnBoardStart from '../screens/start/onBoard/OnBoardStart';
import AuthNavigation from './AuthNavigation';
import Blog from '../screens/main/Blog';
import NewMessageNavigation from './NewMessageNavigation';
import ViewMessage from '../screens/main/view/ViewMessage';
import Profile from '../screens/profile/Profile';
import PersonalInformation from '../screens/profile/personal-info/PersonalInformation';
import PersonalInfoDetails from '../screens/profile/personal-info/PersonalInfoDetails';
import PersonalInfoEmail from '../screens/profile/personal-info/PersonalInfoEmail';
import PersonalInfoPhone from '../screens/profile/personal-info/PersonalInfoPhone';
import PersonalInfoAddress from '../screens/profile/personal-info/PersonalInfoAddress';
import PaymentMethods from '../screens/profile/PaymentMethods';
import DataPrivacy from '../screens/profile/DataPrivacy';
import About from '../screens/profile/About';
import PrivacyDetail from '../screens/profile/PrivacyDetail';
import BecomeMember from '../screens/profile/BecomeMember';
import UpdateEmail from '../screens/profile/update-email/UpdateEmail';
import UpdateEmailPassword from '../screens/profile/update-email/UpdateEmailPassword';
import UpdateEmailConfirm from '../screens/profile/update-email/UpdateEmailConfirm';
import UpdatePhone from '../screens/profile/update-phone/UpdatePhone';
import UpdatePhoneOtp from '../screens/profile/update-phone/UpdatePhoneOtp';
import UpdatePhoneConfirm from '../screens/profile/update-phone/UpdatePhoneConfirm';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ROUTES.OnBoardStart}>
      <Stack.Screen name={ROUTES.OnBoardStart} component={OnBoardStart} />
      <Stack.Screen name={ROUTES.Auth} component={AuthNavigation} />
      <Stack.Screen name={ROUTES.Blog} component={Blog} />
      <Stack.Screen name={ROUTES.NewMessageFlow} component={NewMessageNavigation} />
      <Stack.Screen name={ROUTES.ViewMessage} component={ViewMessage} />
      <Stack.Screen name={ROUTES.Profile} component={Profile} />
      <Stack.Screen name={ROUTES.PersonalInformation} component={PersonalInformation} />
      <Stack.Screen name={ROUTES.PersonalInfoDetails} component={PersonalInfoDetails} />
      <Stack.Screen name={ROUTES.PersonalInfoEmail} component={PersonalInfoEmail} />
      <Stack.Screen name={ROUTES.PersonalInfoPhone} component={PersonalInfoPhone} />
      <Stack.Screen name={ROUTES.PersonalInfoAddress} component={PersonalInfoAddress} />
      <Stack.Screen name={ROUTES.PaymentMethods} component={PaymentMethods} />
      <Stack.Screen name={ROUTES.DataPrivacy} component={DataPrivacy} />
      <Stack.Screen name={ROUTES.PrivacyDetail} component={PrivacyDetail} />
      <Stack.Screen name={ROUTES.DataCollection} component={PrivacyDetail} initialParams={{ type: 'dataCollection' }} />
      <Stack.Screen name={ROUTES.DataUsage} component={PrivacyDetail} initialParams={{ type: 'dataUsage' }} />
      <Stack.Screen name={ROUTES.DataSharing} component={PrivacyDetail} initialParams={{ type: 'dataSharing' }} />
      <Stack.Screen name={ROUTES.UserRights} component={PrivacyDetail} initialParams={{ type: 'userRights' }} />
      <Stack.Screen name={ROUTES.SecurityMeasures} component={PrivacyDetail} initialParams={{ type: 'securityMeasures' }} />
      <Stack.Screen name={ROUTES.About} component={About} />
      <Stack.Screen name={ROUTES.BecomeMember} component={BecomeMember} />
      <Stack.Screen name={ROUTES.UpdateEmail} component={UpdateEmail} />
      <Stack.Screen name={ROUTES.UpdateEmailPassword} component={UpdateEmailPassword} />
      <Stack.Screen name={ROUTES.UpdateEmailConfirm} component={UpdateEmailConfirm} />
      <Stack.Screen name={ROUTES.UpdatePhone} component={UpdatePhone} />
      <Stack.Screen name={ROUTES.UpdatePhoneOtp} component={UpdatePhoneOtp} />
      <Stack.Screen name={ROUTES.UpdatePhoneConfirm} component={UpdatePhoneConfirm} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
