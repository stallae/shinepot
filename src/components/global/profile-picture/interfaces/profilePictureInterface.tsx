import { ImageSourcePropType } from 'react-native';
export interface ProfilePictureProps {
  size: number;
  shape?: 'circle' | 'square';
  className?: string;
  id?: string;
  source?: ImageSourcePropType;
}
