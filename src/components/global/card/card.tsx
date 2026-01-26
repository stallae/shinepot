import * as React from 'react';

import {CardProps} from './interfaces/cardInterface';
import useColors from '../../../hooks/useColors';

import {View, Text} from 'react-native';
import {
  CheckCircle,
  IconContext,
  Question,
  SealCheck,
  XCircle,
} from 'phosphor-react-native';

import WideButton from '../buttons/wideButton';

const Card: React.FC<CardProps> = ({
  title,
  description,
  type,
  icon,
  button,
  secondButton,
}) => {
  const {colors} = useColors();
  return (
    <View
      className={'w-full rounded-xl p-10 gap-5'}
      style={{backgroundColor: colors.secondary}}>
      <IconContext.Provider value={{color: colors.textPrimary}}>
        <View className={'self-center'}>
          {type ? (
            <IconContext.Provider value={{color: colors.textPrimary}}>
              {type === 'success' && (
                <CheckCircle size={43} weight={'fill'} color={colors.success} />
              )}
              {type === 'error' && (
                <XCircle size={43} weight={'fill'} color={colors.error} />
              )}
              {type === 'warning' && (
                <Question size={43} weight={'fill'} color={colors.warning} />
              )}
              {type === 'done' && (
                <SealCheck size={43} weight={'fill'} color={colors.success} />
              )}
            </IconContext.Provider>
          ) : (
            icon
          )}
        </View>
      </IconContext.Provider>

      <Text
        className={`text-4xl font-semibold self-center font-inter`}
        style={{color: colors.textPrimary}}>
        {title}
      </Text>
      <Text
        className={`text-lg font-normal self-center font-inter text-center mt-4 mb-7`}
        style={{color: colors.textPrimary, opacity: 50}}>
        {description}
      </Text>

      <View className="w-full gap-4">
        <WideButton {...button} />
        {secondButton && <WideButton {...secondButton} />}
      </View>
    </View>
  );
};

export default Card;
