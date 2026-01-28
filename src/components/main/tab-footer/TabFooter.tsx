import * as React from 'react';
import { View, Pressable } from 'react-native';
import { GlobeHemisphereWest, ChatsCircle, LockKey } from 'phosphor-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ROUTES } from '../../../navigation/roots';
import useColors from '../../../hooks/useColors';

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface Tab {
  route: keyof RootStackParamList;
  icon: React.ComponentType<{ size: number; color: string; weight: 'fill' | 'regular' }>;
}

const TABS: Tab[] = [
  { route: ROUTES.Blog, icon: GlobeHemisphereWest },
  { route: ROUTES.Threads, icon: ChatsCircle },
  { route: ROUTES.Private, icon: LockKey },
];

const TabFooter: React.FC = () => {
  const { colors } = useColors();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  const isActive = (routeName: string) => route.name === routeName;

  const getButtonStyle = (routeName: string) => ({
    backgroundColor: isActive(routeName) ? colors.primary : 'transparent',
  });

  const getIconColor = (routeName: string) => 
    isActive(routeName) ? '#ffffff' : colors.textPrimary;

  const getIconWeight = (routeName: string) =>
    isActive(routeName) ? 'fill' : 'regular';

  return (
    <View
      className="flex-row items-center justify-around py-4 px-6"
      style={{
        backgroundColor: colors.secondary,
        borderTopWidth: 1,
        borderTopColor: colors.textPrimary + '20',
      }}>
      {TABS.map((tab) => {
        const IconComponent = tab.icon;
        return (
          <Pressable
            key={tab.route}
            onPress={() => navigation.navigate(tab.route as any)}
            className="items-center justify-center w-16 h-16 rounded-2xl"
            style={getButtonStyle(tab.route)}>
            <IconComponent
              size={28}
              color={getIconColor(tab.route)}
              weight={getIconWeight(tab.route)}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default TabFooter;
