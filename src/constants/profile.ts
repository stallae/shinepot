import { User, CreditCard, Shield, Info, Sparkle } from 'phosphor-react-native';
import { ROUTES } from '../navigation/roots';
import type { ProfileMenuItem } from '../interfaces';

export const menuItems: ProfileMenuItem[] = [
    { title: 'Become a premium', icon: Sparkle, route: ROUTES.BecomeMember, highlight: true },
    { title: 'Personal Information', icon: User, route: ROUTES.PersonalInformation },
    { title: 'Payment methods', icon: CreditCard, route: ROUTES.PaymentMethods },
    { title: 'Data Privacy', icon: Shield, route: ROUTES.DataPrivacy },
    { title: 'About', icon: Info, route: ROUTES.About },
];
