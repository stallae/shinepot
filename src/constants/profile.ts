import { PaperPlaneTilt, CalendarHeart, HandArrowDown, Heart, User, CreditCard, Shield, Info, Sparkle } from 'phosphor-react-native';
import { ROUTES } from '../navigation/roots';
import { PROFILE_DATA } from '../_mock/profile';
import { ProfileMenuItem, ProfileStats } from '../screens/profile/interfaces/profileInterface';

export const stats: ProfileStats[] = [
    { title: 'Sent', value: PROFILE_DATA.stats.sent.toString(), icon: PaperPlaneTilt },
    { title: 'Scheduled', value: PROFILE_DATA.stats.scheduled.toString(), icon: CalendarHeart },
    { title: 'Received', value: PROFILE_DATA.stats.received.toString(), icon: HandArrowDown },
    { title: 'Saved', value: PROFILE_DATA.stats.saved.toString(), icon: Heart },
];

export const menuItems: ProfileMenuItem[] = [
    { title: 'Become a premium', icon: Sparkle, route: ROUTES.BecomeMember, highlight: true },
    { title: 'Personal Information', icon: User, route: ROUTES.PersonalInformation },
    { title: 'Payment methods', icon: CreditCard, route: ROUTES.PaymentMethods },
    { title: 'Data Privacy', icon: Shield, route: ROUTES.DataPrivacy },
    { title: 'About', icon: Info, route: ROUTES.About },
];
