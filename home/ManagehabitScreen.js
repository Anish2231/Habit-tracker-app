import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ManageHabitsScreen({ navigation }) {
  const [habits, setHabits] = useState([]);

  const loadHabits = async () => {
    try {
      const habitsFromStorage = await AsyncStorage.getItem('habits');
      if (habitsFromStorage) {
        setHabits(JSON.parse(habitsFromStorage));
      } else {
        setHabits([]);
      }
    } catch (error) {
      console.error('Error loading habits:', error);
    }
  };

  useEffect(() => {
    loadHabits();
  }, []);

  const deleteHabit = async (id) => {
    Alert.alert('Delete Habit', 'Are you sure you want to delete this habit?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            const updatedHabits = habits.filter((habit) => habit.id !== id);
            await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
            setHabits(updatedHabits);
            Alert.alert('Success', 'Habit deleted successfully');
          } catch (error) {
            console.error('Error deleting habit:', error);
          }
        },
      },
    ]);
  };

  const renderHabitItem = ({ item }) => {
    return (
      <View style={styles.habitItemContainer}>
        <Text style={styles.habitItemText}>{item.name}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteHabit(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Manage Habits</Text>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderHabitItem}
        ListEmptyComponent={<Text style={styles.noHabitsText}>No habits to manage</Text>}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddHabit')}
      >
        <Text style={styles.addButtonText}>Add New Habit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6200EE',
  },
  habitItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3, // For Android shadow
  },
  habitItemText: {
    fontSize: 18,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#6200EE',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
    width: '80%',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noHabitsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});
