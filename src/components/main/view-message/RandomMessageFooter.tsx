import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import useColors from '../../../hooks/useColors';
import { Messages } from '../../../interfaces/messages';
import { ArrowClockwise, PaperPlaneRight } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, NewMessageStackParamList, ROUTES, NewMessageData } from '../../../navigation/roots';

interface RandomMessageFooterProps {
  message: Messages;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList>,
  StackNavigationProp<NewMessageStackParamList>
>;

const RandomMessageFooter: React.FC<RandomMessageFooterProps> = ({
  message,
}) => {
  const { colors } = useColors();
  const navigation = useNavigation<NavigationProp>();

  const handleReply = () => {
    const replyData: Omit<NewMessageData, 'title'> = {
      contentType: message.type,
      visibility: 'random',
      date: new Date().toISOString(),
    };
    
    const rootNavigation = navigation as unknown as StackNavigationProp<RootStackParamList>;
    
    rootNavigation.navigate(ROUTES.NewMessageFlow, {
      screen: ROUTES.NewMessageTitle,
      params: {
        data: replyData,
      },
    });
    
  };

  const handlePass = () => {
    console.log('Pass pressed');
  };

  return (
    <View
      className="px-6 py-6 gap-4"
      style={{ backgroundColor: colors.primary }}>
      <Text
        className="text-body-primary text-center mb-2"
        style={{ color: colors.textPrimary, opacity: 0.7 }}>
        This is a random message. You can respond or pass it along.
      </Text>
      
      <View className="flex-row gap-3">
        <Pressable
          onPress={handlePass}
          className="flex-1 flex-row items-center justify-center gap-2 rounded-xl py-4"
          style={{ backgroundColor: colors.secondary }}>
          <ArrowClockwise size={20} color={colors.textPrimary} weight="bold" />
          <Text
            className="text-body-primary font-bold"
            style={{ color: colors.textPrimary }}>
            Pass
          </Text>
        </Pressable>

        <Pressable
          onPress={handleReply}
          className="flex-1 flex-row items-center justify-center gap-2 rounded-xl py-4"
          style={{ backgroundColor: '#0183FD' }}>
          <PaperPlaneRight size={20} color="#FFFFFF" weight="bold" />
          <Text
            className="text-body-primary font-bold"
            style={{ color: '#FFFFFF' }}>
            Reply
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RandomMessageFooter;

