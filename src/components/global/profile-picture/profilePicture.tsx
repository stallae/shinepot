import React from 'react';
import {Image, View} from 'react-native';
import ProfileImage from '../../../assets/images/ProfileImage.png';
import {ProfilePictureProps} from './interfaces/profilePictureInterface.tsx';

const ProfilePicture: React.FC<ProfilePictureProps> = ({shape, size, className, source}) => {
  return (
    <View className="flex-row">
      <Image
        source={source || ProfileImage}
        {...(shape === 'circle'
          ? {borderRadius: 30}
          : shape === 'square'
          ? {borderRadius: 5}
          : {borderRadius: 15})}
        className={`object-contain ${className}`}
        style={{height: size, width: size}}
      />
    </View>
  );
};

export default ProfilePicture;
