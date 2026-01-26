import * as React from 'react';
import {View} from 'react-native';
import useColors from '../../../hooks/useColors';
import {BarProps} from './interfaces/progressBarInterface';

const ProgressBar: React.FC<BarProps> = ({progress}) => {
  const {colors} = useColors();

  return (
    <View
      className="w-10/12 rounded-full h-1.5 mb-4 "
      style={{backgroundColor: colors.third}}>
      <View
        className="bg-blue-500 h-1.5 rounded-full"
        style={{width: `${progress}%`}}></View>
    </View>
  );
};

export default ProgressBar;
