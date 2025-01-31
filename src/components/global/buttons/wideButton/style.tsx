import {StyleSheet} from 'react-native';
import {horizontalScale} from '../../../../assets/styles/scaling.tsx';

const style = StyleSheet.create({
  buttonContainer: {
    width: 345,
    height: 56,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 40,
    paddingVertical: 16,
    paddingHorizontal: 8,
    gap: 8,
  },
  buttonText: {
    color: 'white',
  },
});

export default style;
