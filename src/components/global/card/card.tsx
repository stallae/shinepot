import React from 'react';

import {CardProps} from '../interfaces/cardInterface.tsx';
import useColors from '../../../hooks/useColors.tsx';

import {View, Text} from 'react-native';
import {
  CheckCircle,
  IconContext,
  Question,
  SealCheck,
  XCircle,
} from 'phosphor-react-native';

import WideButton from '../buttons/wideButton.tsx';

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
      className={'w-11/12 mx-auto my-10 rounded-xl p-10 gap-5'}
      style={{backgroundColor: colors.secondary}}>
      <IconContext.Provider value={{color: colors.textPrimary}}>
        <View className={'self-center'}>
          {type ? (
            <IconContext.Provider value={{color: colors.textPrimary}}>
              {type === 'success' && (
                <CheckCircle size={43} weight={'fill'} color={'#5bca89'} />
              )}
              {type === 'error' && (
                <XCircle size={43} weight={'fill'} color={'#FF7C7C'} />
              )}
              {type === 'warning' && (
                <Question size={43} weight={'fill'} color={'#FFC107'} />
              )}
              {type === 'done' && (
                <SealCheck size={43} weight={'fill'} color={'#5bca89'} />
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
        className={`text-lg font-normal self-center font-inter text-center`}
        style={{color: colors.textPrimary, opacity: 50}}>
        {description}
      </Text>

      <View
        className={`flex-row justify-center my-5 gap-4 self-center justify-items-center ${
          secondButton ? 'w-1/2' : 'w-full'
        }`}>
        <WideButton {...button} />
        {secondButton && <WideButton {...secondButton} />}
      </View>
    </View>
  );
};

export default Card;
