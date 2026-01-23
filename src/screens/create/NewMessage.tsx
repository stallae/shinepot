import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    Text,
    Pressable,
} from 'react-native';
import { ScreenProps } from '../../navigation/types';
import useColors from '../../hooks/useColors';
import { Header, WideButton, SelectButton, MessageTypeInfoModal, DatePickerModal } from '../../components';
import { MOODS } from '../../constants/moods';
import { CONTENT_TYPES } from '../../constants/contentTypes';
import { MODAL_TYPE_FILTER_OPTIONS } from '../../constants/filter';
import { ModalTypeFilterType } from '../../constants/filter';
import { Question } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ROUTES, NewMessageStackParamList } from '../../navigation/roots';


const NewMessage: React.FC<ScreenProps> = () => {
    const navigation = useNavigation<StackNavigationProp<NewMessageStackParamList>>();
    const { colors } = useColors();
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [selectedContentType, setSelectedContentType] = useState<string | null>(
        null,
    );
    const [selectedMessageType, setSelectedMessageType] = useState<ModalTypeFilterType | null>(null);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    return (
        <SafeAreaView
            className="flex-1"
            style={{ backgroundColor: colors.primary }}>
            <Header />
            <ScrollView
                className="flex-1 pt-10"
                contentContainerStyle={{ paddingBottom: 32 }}>
                <View className="px-6">
                    <Text
                        className="text-heading-lg mb-8"
                        style={{ color: colors.textPrimary }}>
                        New Message
                    </Text>

                    <View className="mb-8">
                        <Text
                            className="text-body-primary mb-4"
                            style={{ color: colors.textPrimary, opacity: 0.4 }}>
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
                            style={{ color: colors.textPrimary, opacity: 0.4 }}>
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
                        <View className="flex-row items-center gap-2 mb-4">
                            <Text
                                className="text-body-primary"
                                style={{ color: colors.textPrimary, opacity: 0.4 }}>
                                Message type
                            </Text>
                            <Pressable onPress={() => setIsInfoModalOpen(true)} className="opacity-50">
                                <Question size={18} color={colors.textPrimary} />
                            </Pressable>
                        </View>
                        <View className="flex-row flex-wrap gap-4">
                            {MODAL_TYPE_FILTER_OPTIONS.map(type => {
                                const isSelected = selectedMessageType === type.value;
                                const hasSelection = selectedMessageType !== null;
                                return (
                                    <SelectButton
                                        key={type.value}
                                        label={type.label}
                                        onPress={() =>
                                            setSelectedMessageType(
                                                selectedMessageType === type.value
                                                    ? null
                                                    : (type.value as ModalTypeFilterType),
                                            )
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
                            className="text-body-primary"
                            style={{ color: colors.textPrimary, opacity: 0.4 }}>
                            Schedule delivery date
                        </Text>
                        <Pressable
                            className="py-2"
                            onPress={() => setIsDatePickerOpen(true)}>
                            <Text
                                className={`text-body-secondary ${selectedDate ? '' : 'text-blue-500'}`}
                                style={selectedDate ? { color: colors.textPrimary } : {}}
                            >
                                {selectedDate ? selectedDate.toLocaleDateString() : 'Click to choose date'}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>

            <View className="px-6 pb-6">
                <WideButton
                    text="Keep going"
                    onPress={() => {
                        if (selectedMood && selectedContentType && selectedMessageType && selectedDate) {
                            navigation.navigate(ROUTES.NewMessageTitle, {
                                data: {
                                    mood: selectedMood,
                                    contentType: selectedContentType,
                                    messageType: selectedMessageType,
                                    date: selectedDate.toISOString(),
                                },
                            });
                        }
                    }}
                    isDisabled={!selectedMood || !selectedContentType || !selectedMessageType || !selectedDate}
                />
            </View>

            <MessageTypeInfoModal
                visible={isInfoModalOpen}
                onClose={() => setIsInfoModalOpen(false)}
            />

            <DatePickerModal
                visible={isDatePickerOpen}
                onClose={() => setIsDatePickerOpen(false)}
                onSelect={(date) => setSelectedDate(date)}
                initialDate={selectedDate || undefined}
                minDate={new Date()}
            />
        </SafeAreaView>
    );
};

export default NewMessage;

