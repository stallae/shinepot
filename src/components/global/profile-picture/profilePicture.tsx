import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ROUTES, RootStackParamList } from '../../../navigation/roots';
import ProfileImage from '../../../assets/images/ProfileImage.png';
import { ProfilePictureProps } from './interfaces/profilePictureInterface';

const ProfilePicture: React.FC<ProfilePictureProps> = ({ shape, size, className, source }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      className="flex-row"
      onPress={() => navigation.navigate(ROUTES.Profile)}>
      <Image
        source={source || ProfileImage}
        {...(shape === 'circle'
          ? { borderRadius: 30 }
          : shape === 'square'
            ? { borderRadius: 5 }
            : { borderRadius: 15 })}
        className={`object-contain ${className}`}
        style={{ height: size, width: size }}
      />
    </TouchableOpacity>
  );
};

export default ProfilePicture;
