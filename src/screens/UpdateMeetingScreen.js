import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ParticipantSelectionModal from '../components/ParticipantSelectionModal';
import { validateMeetingForm, validateMeetingTitle, validateMeetingLink } from '../utils/validation';

export default function UpdateMeetingScreen({ navigation, route }) {
  const { selectedDateTime } = route.params || {};
  
  const [meetingTitle, setMeetingTitle] = useState('Property Visit Demo');
  const [meetingType, setMeetingType] = useState('Offline'); // 'Offline' or 'Online'
  const [reminder, setReminder] = useState('Notification');
  const [meetingLink, setMeetingLink] = useState('');

  const generateMeetingLink = () => {
    const randomId = Math.random().toString(36).substring(2, 15);
    const timestamp = Date.now();
    return `https://propertymeet.example.com/${randomId}-${timestamp}`;
  };

  React.useEffect(() => {
    if (meetingType === 'Online') {
      setMeetingLink(generateMeetingLink());
    } else {
      setMeetingLink('');
    }
  }, [meetingType]);
  const [notes, setNotes] = useState('Prepare client presentation slides before the meeting');
  const [participants, setParticipants] = useState([
    { id: 1, name: 'John Doe', avatar: '👨‍💼', selected: true },
    { id: 2, name: 'Jane Smith', avatar: '👩‍💼', selected: true },
  ]);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showParticipantModal, setShowParticipantModal] = useState(false);
  const [errors, setErrors] = useState({});
  
  const reminderOptions = ['Notification', '5 minutes before', '15 minutes before', '30 minutes before', '1 hour before'];
  
  const allParticipants = [
    { id: 1, name: 'John Doe', avatar: '👨‍💼', role: 'Project Manager' },
    { id: 2, name: 'Jane Smith', avatar: '👩‍💼', role: 'Team Lead' },
    { id: 3, name: 'Mike Johnson', avatar: '👨‍💻', role: 'Developer' },
    { id: 4, name: 'Sarah Wilson', avatar: '👩‍🔬', role: 'Designer' },
    { id: 5, name: 'David Brown', avatar: '👨‍🎨', role: 'Marketing' },
    { id: 6, name: 'Lisa Davis', avatar: '👩‍💻', role: 'QA Engineer' },
  ];

  const formatSelectedDateTime = () => {
    if (!selectedDateTime) return '12-05-2025 | 5:00 PM';
    
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const month = months[selectedDateTime.month];
    const day = selectedDateTime.date.toString().padStart(2, '0');
    const year = selectedDateTime.year;
    
    let hour = selectedDateTime.hour;
    const minute = selectedDateTime.minute.toString().padStart(2, '0');
    const period = selectedDateTime.period;
    
    return `${day}-${month}-${year} | ${hour}:${minute} ${period}`;
  };

  const handleTypeToggle = (type) => {
    setMeetingType(type);
  };

  const handleParticipantToggle = (participantId) => {
    setParticipants(prev => {
      const existing = prev.find(p => p.id === participantId);
      if (existing) {
        return prev.filter(p => p.id !== participantId);
      } else {
        const newParticipant = allParticipants.find(p => p.id === participantId);
        return [...prev, { ...newParticipant, selected: true }];
      }
    });
  };

  const handleReminderSelect = (option) => {
    setReminder(option);
    setShowReminderModal(false);
  };

  const handleTitleChange = (text) => {
    setMeetingTitle(text);
    if (errors.meetingTitle) {
      const error = validateMeetingTitle(text);
      setErrors(prev => ({ ...prev, meetingTitle: error }));
    }
  };

  const handleLinkChange = (text) => {
    setMeetingLink(text);
    if (errors.meetingLink && meetingType === 'Online') {
      const error = validateMeetingLink(text);
      setErrors(prev => ({ ...prev, meetingLink: error }));
    }
  };

  const handleCopyLink = () => {
    Clipboard.setString(meetingLink);
    Alert.alert('Success', 'Meeting link copied to clipboard!');
  };

  const handleUpdateMeeting = () => {
    const formData = {
      meetingTitle,
      selectedDateTime,
      meetingType,
      meetingLink,
      participants,
    };

    const validation = validateMeetingForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});
    
    // Handle meeting update logic here
    console.log('Meeting updated:', {
      title: meetingTitle,
      type: meetingType,
      dateTime: selectedDateTime,
      participants,
      reminder,
      link: meetingLink,
      notes,
    });
    
    // Navigate back or show success message
    navigation.goBack();
  };

  const handleBack = () => {
    if (navigation?.canGoBack()) navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
            accessibilityLabel="Go back"
          onPress={handleBack}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Meeting</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Meeting Title */}
        <View style={styles.section}>
          <Text style={styles.label}>Meeting Title*</Text>
          <TextInput
            style={[styles.input, errors.meetingTitle && styles.inputError]}
            value={meetingTitle}
            onChangeText={handleTitleChange}
            placeholder="Enter meeting title"
          />
          {errors.meetingTitle && (
            <Text style={styles.errorText}>{errors.meetingTitle}</Text>
          )}
        </View>

        {/* Date and Time */}
        <View style={styles.section}>
          <Text style={styles.label}>Date and Time*</Text>
          <TouchableOpacity 
            style={styles.dateTimeContainer}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.dateTimeText}>{formatSelectedDateTime()}</Text>
            <Ionicons name="calendar-outline" size={20} color="#8B5CF6" />
          </TouchableOpacity>
        </View>

        {/* Meeting Type */}
        <View style={styles.section}>
          <Text style={styles.label}>Meeting Type*</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, meetingType === 'Offline' && styles.activeToggle]}
              onPress={() => handleTypeToggle('Offline')}
            >
              <Text style={[styles.toggleText, meetingType === 'Offline' && styles.activeToggleText]}>
                Offline
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, meetingType === 'Online' && styles.activeToggle]}
              onPress={() => handleTypeToggle('Online')}
            >
              <Text style={[styles.toggleText, meetingType === 'Online' && styles.activeToggleText]}>
                Online
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Reminder */}
        <View style={styles.section}>
          <Text style={styles.label}>Reminder</Text>
          <TouchableOpacity 
            style={styles.dropdownContainer}
            onPress={() => setShowReminderModal(true)}
          >
            <Text style={styles.dropdownText}>{reminder}</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Participants */}
        <View style={styles.section}>
          <View style={styles.participantsHeader}>
            <Text style={styles.label}>Participants</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowParticipantModal(true)}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.participantsList}>
            {participants.map((participant) => (
              <View key={participant.id} style={styles.participantItem}>
                <Text style={styles.participantAvatar}>{participant.avatar}</Text>
              </View>
            ))}
          </View>
          {errors.participants && (
            <Text style={styles.errorText}>{errors.participants}</Text>
          )}
        </View>

        {/* Meeting Link (only show if Online) */}
        {meetingType === 'Online' && (
          <View style={styles.section}>
            <Text style={styles.label}>Link</Text>
            <TextInput
              style={[styles.input, errors.meetingLink && styles.inputError]}
              value={meetingLink}
              onChangeText={handleLinkChange}
              placeholder="Enter meeting link"
              keyboardType="url"
            />
            {errors.meetingLink && (
              <Text style={styles.errorText}>{errors.meetingLink}</Text>
            )}
          </View>
        )}

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.label}>Note</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Add notes..."
            multiline
            numberOfLines={3}
          />
        </View>
      </ScrollView>

      {/* Update Meeting Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateMeeting}>
          <Text style={styles.updateButtonText}>Update meeting</Text>
        </TouchableOpacity>
      </View>

      {/* Reminder Modal */}
      <Modal
        visible={showReminderModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowReminderModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Reminder</Text>
            {reminderOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOption}
                onPress={() => handleReminderSelect(option)}
              >
                <Text style={styles.modalOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setShowReminderModal(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Participant Selection Modal */}
      <ParticipantSelectionModal
        visible={showParticipantModal}
        onClose={() => setShowParticipantModal(false)}
        participants={allParticipants}
        selectedParticipants={participants}
        onParticipantToggle={handleParticipantToggle}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F5F5F5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  dateTimeContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  dateTimeText: {
    fontSize: 16,
    color: '#333',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    padding: 3,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 22,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeToggleText: {
    color: '#333',
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  participantsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  participantsList: {
    flexDirection: 'row',
    gap: 12,
  },
  participantItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  participantAvatar: {
    fontSize: 20,
  },
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#F5F5F5',
  },
  updateButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  modalCancel: {
    paddingVertical: 15,
    marginTop: 10,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#8B5CF6',
    textAlign: 'center',
    fontWeight: '600',
  },
  inputError: {
    borderColor: '#FF6B6B',
    borderWidth: 2,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});