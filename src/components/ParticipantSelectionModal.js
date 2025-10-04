import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ParticipantSelectionModal({ 
  visible, 
  onClose, 
  participants, 
  selectedParticipants, 
  onParticipantToggle 
}) {
  const [searchText, setSearchText] = useState('');

  const filteredParticipants = participants.filter(participant =>
    participant.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const isSelected = (participantId) => {
    return selectedParticipants.some(p => p.id === participantId);
  };

  const renderParticipantItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.participantItem, isSelected(item.id) && styles.selectedParticipant]}
      onPress={() => onParticipantToggle(item.id)}
    >
      <View style={styles.participantInfo}>
        <Text style={styles.participantAvatar}>{item.avatar}</Text>
        <View style={styles.participantDetails}>
          <Text style={styles.participantName}>{item.name}</Text>
          <Text style={styles.participantRole}>{item.role || 'Team Member'}</Text>
        </View>
      </View>
      {isSelected(item.id) && (
        <Ionicons name="checkmark-circle" size={24} color="#8B5CF6" />
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Add Participants</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.doneButton}>Done</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search participants..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Selected Count */}
        <Text style={styles.selectedCount}>
          {selectedParticipants.length} participant{selectedParticipants.length !== 1 ? 's' : ''} selected
        </Text>

        {/* Participants List */}
        <FlatList
          data={filteredParticipants}
          renderItem={renderParticipantItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  cancelButton: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  doneButton: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  selectedCount: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  selectedParticipant: {
    borderColor: '#8B5CF6',
    backgroundColor: '#F8F5FF',
  },
  participantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  participantAvatar: {
    fontSize: 24,
    marginRight: 15,
  },
  participantDetails: {
    flex: 1,
  },
  participantName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  participantRole: {
    fontSize: 14,
    color: '#666',
  },
});