import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function DateTimePickerScreen({ navigation }) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedHour, setSelectedHour] = useState(today.getHours() % 12 || 12);
  const [selectedMinute, setSelectedMinute] = useState(Math.floor(today.getMinutes() / 5) * 5);
  const [selectedPeriod, setSelectedPeriod] = useState(today.getHours() >= 12 ? 'PM' : 'AM');
  
  const handleInstantMeeting = () => {
    const now = new Date();
    const dateTime = {
      date: now.getDate(),
      month: now.getMonth(),
      year: now.getFullYear(),
      hour: now.getHours() % 12 || 12,
      minute: Math.floor(now.getMinutes() / 5) * 5,
      period: now.getHours() >= 12 ? 'PM' : 'AM',
      isInstant: true
    };
    navigation.navigate('UpdateMeeting', { selectedDateTime: dateTime });
  };

  const [activeSection, setActiveSection] = useState('date'); // 'date' or 'time'

  const TimeControl = ({ onPress, icon }) => (
    <TouchableOpacity style={styles.timeControl} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#7950F2" />
    </TouchableOpacity>
  );

  const TimePicker = () => (
    <View style={styles.timePickerContainer}>
      <View style={styles.timeRow}>
        <View style={styles.timeUnit}>
          <TimeControl onPress={() => handleHourChange(selectedHour < 12 ? selectedHour + 1 : 1)} icon="chevron-up" />
          <Text style={styles.timeUnitText}>{String(selectedHour).padStart(2, '0')}</Text>
          <TimeControl onPress={() => handleHourChange(selectedHour > 1 ? selectedHour - 1 : 12)} icon="chevron-down" />
        </View>
        
        <Text style={styles.separator}>:</Text>
        
        <View style={styles.timeUnit}>
          <TimeControl onPress={() => handleMinuteChange(selectedMinute < 55 ? selectedMinute + 5 : 0)} icon="chevron-up" />
          <Text style={styles.timeUnitText}>{String(selectedMinute).padStart(2, '0')}</Text>
          <TimeControl onPress={() => handleMinuteChange(selectedMinute > 0 ? selectedMinute - 5 : 55)} icon="chevron-down" />
        </View>

        <TouchableOpacity 
          style={[styles.ampmToggle, selectedPeriod === 'PM' && styles.selectedAmPm]} 
          onPress={handlePeriodChange}
        >
          <Text style={[styles.ampmText, selectedPeriod === 'PM' && { color: '#fff' }]}>
            {selectedPeriod}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5); // 5-minute intervals

  const handleHourChange = (hour) => {
    setSelectedHour(hour);
  };

  const handleMinuteChange = (minute) => {
    setSelectedMinute(minute);
  };

  const handlePeriodChange = () => {
    setSelectedPeriod(prev => prev === 'AM' ? 'PM' : 'AM');
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  const generateCalendarDays = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
    const currentDate = new Date();
    const todayMidnight = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    const days = [];

    // Leading placeholders
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, selectedMonth, day);
      days.push({
        day,
        disabled: date < todayMidnight,
      });
    }

    // Trailing placeholders so total length is multiple of 7
    const remainder = days.length % 7;
    if (remainder !== 0) {
      const placeholdersToAdd = 7 - remainder;
      for (let i = 0; i < placeholdersToAdd; i++) {
        days.push(null);
      }
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const handleDateSelect = (dayObj) => {
    if (dayObj && !dayObj.disabled) {
      // Reset selection if the date is from a different month/year
      if (selectedMonth !== new Date().getMonth() || selectedYear !== new Date().getFullYear()) {
        setSelectedDate(dayObj.day);
      } else {
        // Only allow selecting current or future dates
        const selectedDate = new Date(selectedYear, selectedMonth, dayObj.day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate >= today) {
          setSelectedDate(dayObj.day);
        }
      }
    }
  };

  const handlePreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const isCurrentMonth = () => {
    const today = new Date();
    return selectedMonth === today.getMonth() && selectedYear === today.getFullYear();
  };

  const handleDone = () => {
    const selectedDateTime = {
      date: selectedDate,
      month: selectedMonth,
      year: selectedYear,
      hour: selectedHour,
      minute: selectedMinute,
      period: selectedPeriod,
    };
    
    navigation.navigate('UpdateMeeting', { selectedDateTime });
  };

  const handleBack = () => {
    if (navigation?.canGoBack()) navigation.goBack();
    else navigation.navigate('UpdateMeeting');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerSimple}>
        <TouchableOpacity onPress={handleBack} style={styles.headerBackBtn} accessibilityLabel="Go back">
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitleInline}>Schedule Meet</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.tabsWrapper}>
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeSection === 'date' && styles.activeTab]}
              onPress={() => setActiveSection('date')}
            >
              <Ionicons 
                name="calendar-outline" 
                size={20} 
                color={activeSection === 'date' ? '#fff' : '#666'} 
              />
              <Text style={[styles.tabText, activeSection === 'date' && styles.activeTabText]}>
                Select Date
              </Text>
            </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeSection === 'time' && styles.activeTab]}
            onPress={() => setActiveSection('time')}
          >
            <Ionicons 
              name="time-outline" 
              size={24} 
              color={activeSection === 'time' ? '#1a73e8' : '#666'} 
            />
            <Text style={[styles.tabText, activeSection === 'time' && styles.activeTabText]}>
              Select Time
            </Text>
          </TouchableOpacity>
        </View>
        </View>

        <TouchableOpacity 
          style={[styles.primaryButton]}
          onPress={handleInstantMeeting}
        >
          <Ionicons name="flash-outline" size={24} color="#fff" />
          <Text style={styles.primaryButtonText}>Start Instant Meeting</Text>
        </TouchableOpacity>

        {activeSection === 'date' ? (
          <View style={styles.calendarContainer}>
            <View style={styles.monthHeader}>
                <TouchableOpacity 
                  onPress={handlePreviousMonth}
                  disabled={isCurrentMonth()}
                  style={[
                    styles.monthArrowButton,
                    isCurrentMonth() && styles.disabledMonthArrow
                  ]}
                >
                  <Ionicons 
                    name="chevron-back" 
                    size={20} 
                    color={isCurrentMonth() ? '#ccc' : '#333'} 
                  />
                </TouchableOpacity>
                <Text style={styles.monthText}>
                  {monthNames[selectedMonth]} {selectedYear}
                </Text>
                <TouchableOpacity 
                  onPress={handleNextMonth}
                  style={styles.monthArrowButton}
                >
                  <Ionicons name="chevron-forward" size={20} color="#333" />
                </TouchableOpacity>
              </View>

        {/* Days of week header */}
        <View style={styles.daysHeader}>
          {daysOfWeek.map((day, index) => (
            <Text key={index} style={styles.dayHeaderText}>
              {day}
            </Text>
          ))}
        </View>

            {/* Calendar Grid */}
            <View style={styles.calendarGrid}>
              {calendarDays.map((dayObj, index) => {
                const isSelected = dayObj?.day === selectedDate;
                const isDisabled = dayObj?.disabled;
                return (
                  <View key={index} style={[styles.dayCellWrapper]}>
                    {dayObj ? (
                      <TouchableOpacity
                        style={[
                          styles.dayCell,
                          isSelected && styles.selectedDayCell,
                          isDisabled && styles.disabledDayCell,
                        ]}
                        onPress={() => handleDateSelect(dayObj)}
                        disabled={isDisabled}
                      >
                        <Text
                          style={[
                            styles.dayText,
                            isSelected && styles.selectedDayText,
                            isDisabled && styles.disabledDayText,
                          ]}
                        >
                          {dayObj.day}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.dayCell} />
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        ) : (
          <TimePicker />
        )}

        <TouchableOpacity style={[styles.primaryButton, styles.scheduleButtonSpacing]} onPress={handleDone}>
          <Text style={styles.primaryButtonText}>Schedule Visit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  monthControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthControlButton: {
    padding: 8,
    borderRadius: 20,
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  dayHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCellWrapper: {
    width: '14.2857%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCell: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    borderRadius: 20,
  },
  selectedDayCell: {
    backgroundColor: '#7950F2',
  },
  disabledDayCell: {
    opacity: 0.35,
  },
  todayCell: {
    borderWidth: 1,
    borderColor: '#7950F2',
    borderRadius: 20,
  },
  doneButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doneButtonText: {
    color: '#7950F2',
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7950F2',
    marginHorizontal: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: '#7950F2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  scheduleButtonSpacing: {
    marginTop: 24,
    marginBottom: 40,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  headerSimple: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  headerBackBtn: { padding: 4, marginRight: 8 },
  headerTitleInline: { fontSize: 20, fontWeight: '600', color: '#333' },
  tabsWrapper: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  activeTab: {
    backgroundColor: '#7950F2',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '500',
  },
  instantMeetingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7950F2',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: '#7950F2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  instantMeetingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  timePickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  timeUnit: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  timeUnitText: {
    fontSize: 36,
    fontWeight: '600',
    color: '#333',
  },
  timeControl: {
    padding: 8,
    borderRadius: 20,
  },
  separator: {
    fontSize: 36,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 5,
  },
  ampmToggle: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 10,
    marginLeft: 15,
  },
  ampmText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  selectedAmPm: {
    backgroundColor: '#7950F2',
  },
  instantMeetingButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#8B5CF6',
  },
  instantMeetingText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  timePickerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
  },
  timeColumn: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  timeColumnTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  tabs: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  activeTab: {
    backgroundColor: '#e8f0fe',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#1a73e8',
  },
  section: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calendar: {
    marginTop: 16,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  monthArrowButton: {
    padding: 8,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  dayHeaderText: {
    width: 40,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCellWrapper: {
    width: '14.2857%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCell: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    borderRadius: 20,
  },
  selectedDayCell: {
    backgroundColor: '#7950F2',
  },
  disabledDayCell: {
    opacity: 0.35,
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: '600',
  },
  disabledDayText: {
    color: '#999',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  timePickerSection: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  timeValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  timeSeparator: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 5,
  },
  periodContainer: {
    marginLeft: 15,
  },
  periodText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  doneButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignSelf: 'center',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  scheduleButton: {
    backgroundColor: '#8B5CF6',
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  scheduleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});