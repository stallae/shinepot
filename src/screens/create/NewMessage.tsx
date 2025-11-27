import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Pressable,
} from 'react-native';
import {ScreenProps} from '../../navigation/types';
import useColors from '../../hooks/useColors';
import {Header, WideButton, ProfilePicture, SelectButton} from '../../components';
import {MOODS} from '../../constants/moods.ts';
import {CONTENT_TYPES} from '../../constants/contentTypes.ts';
import {Plus} from 'phosphor-react-native';

const NewMessage: React.FC<ScreenProps> = () => {
  const {colors} = useColors();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedContentType, setSelectedContentType] = useState<string | null>(
    null,
  );

  return (
    <SafeAreaView
      className="flex-1"
      style={{backgroundColor: colors.primary}}>
      <Header />
      <ScrollView
        className="flex-1 pt-10"
        contentContainerStyle={{paddingBottom: 32}}>
        <View className="px-6">
          <Text
            className="text-heading-lg mb-8"
            style={{color: colors.textPrimary}}>
            New Message
          </Text>

          <View className="mb-8">
            <Text
              className="text-body-primary mb-4"
              style={{color: colors.textPrimary, opacity: 0.4}}>
              How do you feeling now?
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {MOODS.map(mood => {
                const isSelected = selectedMood === mood.id;
                const hasSelection = selectedMood !== null;
                return (
                  <SelectButton
                    key={mood.id}
                    emoji={mood.emoji}
                    label={mood.label}
                    onPress={() =>
                      setSelectedMood(selectedMood === mood.id ? null : mood.id)
                    }
                    isSelected={isSelected}
                    hasSelection={hasSelection}
                    size="small"
                  />
                );
              })}
            </View>
          </View>

          <View className="mb-8">
          <Text
              className="text-body-primary mb-4"
              style={{color: colors.textPrimary, opacity: 0.4}}>
              Type of content
            </Text>
            <View className="flex-row flex-wrap gap-4">
              {CONTENT_TYPES.map(type => {
                const isSelected = selectedContentType === type.id;
                const hasSelection = selectedContentType !== null;
                const IconComponent = type.icon;
                return (
                  <SelectButton
                    key={type.id}
                    icon={
                      <IconComponent
                        size={24}
                        color={colors.textPrimary}
                        weight="bold"
                      />
                    }
                    onPress={() =>
                      setSelectedContentType(
                        selectedContentType === type.id ? null : type.id,
                      )
                    }
                    isSelected={isSelected}
                    hasSelection={hasSelection}
                  />
                );
              })}
            </View>
          </View>

          <View className="mb-8">
          <Text
              className="text-body-primary mb-4"
              style={{color: colors.textPrimary, opacity: 0.4}}>    
              Especial recipients
            </Text>
            <View className="flex-row gap-4 items-center">
              <ProfilePicture size={50} shape="circle" />
              <ProfilePicture size={50} shape="circle" />
              <Pressable
                className="w-12 h-12 rounded-full justify-center items-center border-2 border-dashed"
                style={{
                  borderColor: colors.textPrimary,
                  opacity: 0.5,
                }}>
                <Plus size={24} weight="bold" color={colors.textPrimary} />
              </Pressable>
            </View>
          </View>

          <View className="mb-8">
            <Text
              className="text-body-primary mb-4"
              style={{color: colors.textPrimary, opacity: 0.4}}>
              Schedule delivery date
            </Text>
            <Pressable
              className="py-4"
              onPress={() => {
                // TODO: Open date picker
                console.log('Open date picker');
              }}>
              <Text
                className="text-body-primary text-blue-500 "
                >
                Clique to choose date
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <View className="px-6 pb-6">
        <WideButton
          text="Keep going"
          onPress={() => {
            // TODO: Navigate to next step
            console.log('Keep going');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default NewMessage;

