import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, Pressable, Modal, FlatList } from 'react-native';
import { X, CaretLeft, CaretRight } from 'phosphor-react-native';
import useColors from '../../../hooks/useColors';

interface DatePickerModalProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (date: Date) => void;
    initialDate?: Date;
    minDate?: Date;
}

const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const DatePickerModal: React.FC<DatePickerModalProps> = ({
    visible,
    onClose,
    onSelect,
    initialDate,
    minDate,
}) => {
    const { colors } = useColors();
    const [currentMonth, setCurrentMonth] = useState(initialDate || new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        initialDate || null,
    );

    useEffect(() => {
        if (visible && initialDate) {
            setSelectedDate(initialDate);
            setCurrentMonth(initialDate);
        } else if (visible && !initialDate) {
            // Reset to today if no initial date provided when opening
            const today = new Date();
            if (!selectedDate) {
                setCurrentMonth(today);
            }
        }
    }, [visible, initialDate]);

    const daysInMonth = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: days }, (_, i) => i + 1);
    }, [currentMonth]);

    const firstDayOfMonth = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, 1).getDay();
    }, [currentMonth]);

    const calendarGrid = useMemo(() => {
        const grid: (number | null)[] = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            grid.push(null);
        }
        daysInMonth.forEach(day => grid.push(day));
        return grid;
    }, [daysInMonth, firstDayOfMonth]);


    const handlePrevMonth = () => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
        );
    };

    const handleNextMonth = () => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
        );
    };

    const handleDatePress = (day: number) => {
        const newDate = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day,
        );

        // Check minDate
        if (minDate) {
            const checkDate = new Date(newDate);
            checkDate.setHours(23, 59, 59, 999); // Allow selecting today if minDate is today
            const minDateStart = new Date(minDate);
            minDateStart.setHours(0, 0, 0, 0);

            if (checkDate < minDateStart) return;
        }

        setSelectedDate(newDate);
        onSelect(newDate);
        onClose();
    };

    const isToday = (day: number) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            currentMonth.getMonth() === today.getMonth() &&
            currentMonth.getFullYear() === today.getFullYear()
        );
    };

    const isSelected = (day: number) => {
        if (!selectedDate) return false;
        return (
            day === selectedDate.getDate() &&
            currentMonth.getMonth() === selectedDate.getMonth() &&
            currentMonth.getFullYear() === selectedDate.getFullYear()
        );
    };

    const isDisabled = (day: number) => {
        if (!minDate) return false;
        const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        dateToCheck.setHours(23, 59, 59, 999);
        const minDateStart = new Date(minDate);
        minDateStart.setHours(0, 0, 0, 0);
        return dateToCheck < minDateStart;
    }

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}>
            <Pressable
                className="flex-1 justify-center items-center px-6"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                onPress={onClose}>
                <Pressable
                    className="rounded-3xl p-6 w-full"
                    style={{ backgroundColor: colors.secondary }}
                    onPress={e => e.stopPropagation()}>

                    {/* Header */}
                    <View className="flex-row items-center justify-between mb-6">
                        <Text
                            className="text-heading-sm font-bold"
                            style={{ color: colors.textPrimary }}>
                            Select Date
                        </Text>
                        <Pressable onPress={onClose}>
                            <X size={24} color={colors.textPrimary} />
                        </Pressable>
                    </View>

                    {/* Month Navigation */}
                    <View className="flex-row items-center justify-between mb-4">
                        <Pressable onPress={handlePrevMonth} className="p-2">
                            <CaretLeft size={20} color={colors.textPrimary} />
                        </Pressable>
                        <Text className="text-body-primary font-bold" style={{ color: colors.textPrimary }}>
                            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </Text>
                        <Pressable onPress={handleNextMonth} className="p-2">
                            <CaretRight size={20} color={colors.textPrimary} />
                        </Pressable>
                    </View>

                    {/* Days Header */}
                    <View className="flex-row justify-between mb-2">
                        {DAYS_OF_WEEK.map((day, index) => (
                            <Text key={index} className="text-center w-10 text-body-sm font-medium" style={{ color: colors.textPrimary, opacity: 0.5 }}>
                                {day}
                            </Text>
                        ))}
                    </View>

                    {/* Calendar Grid */}
                    <View className="flex-row flex-wrap">
                        {calendarGrid.map((day, index) => {
                            if (day === null) {
                                return <View key={`empty-${index}`} className="w-10 h-10 m-[1.5%]" />;
                            }

                            const selected = isSelected(day);
                            const today = isToday(day);
                            const disabled = isDisabled(day);

                            return (
                                <Pressable
                                    key={day}
                                    onPress={() => !disabled && handleDatePress(day)}
                                    className={`w-10 h-10 m-[1.5%] justify-center items-center rounded-full ${selected ? 'bg-primary' : ''} ${today && !selected ? 'border border-primary' : ''}`}
                                    style={selected ? { backgroundColor: colors.primary } : (today && !selected ? { borderColor: colors.textPrimary } : {})}
                                >
                                    <Text
                                        className={`text-body-sm ${selected ? 'font-bold' : ''}`}
                                        style={{
                                            color: colors.textPrimary,
                                            opacity: disabled ? 0.3 : 1
                                        }}>
                                        {day}
                                    </Text>
                                </Pressable>
                            )
                        })}
                    </View>

                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default DatePickerModal;
