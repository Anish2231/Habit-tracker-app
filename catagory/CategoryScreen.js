import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CategoryScreen() {
  const [categorizedHabits, setCategorizedHabits] = useState({});
  const [loading, setLoading] = useState(true);

  // Function to categorize habits by their type
  const categorizeHabits = (habits) => {
    const categorized = habits.reduce((acc, habit) => {
      const { type } = habit;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(habit);
      return acc;
    }, {});
    return categorized;
  };

  // Load habits from AsyncStorage
  useEffect(() => {
    const loadHabits = async () => {
      try {
        const habitsFromStorage = await AsyncStorage.getItem('habits');
        if (habitsFromStorage) {
          const habits = JSON.parse(habitsFromStorage);
          const categorized = categorizeHabits(habits);
          setCategorizedHabits(categorized);
        }
      } catch (error) {
        console.error('Error loading habits from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHabits();
  }, []);

  // If data is still loading, show loading indicator
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text>Loading habits...</Text>
      </View>
    );
  }

  // If no habits are found, display a message
  if (Object.keys(categorizedHabits).length === 0) {
    return (
      <View style={styles.container}>
        <Text>No categorized habits available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {Object.keys(categorizedHabits).map((category) => (
        <View key={category} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category}</Text>
          <FlatList
            data={categorizedHabits[category]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.habitItem}>
                <Text style={styles.habitName}>{item.name}</Text>
                <Text style={styles.habitDetails}>
                  Streak: {item.completedDates.length} days
                </Text>
              </View>
            )}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 10,
  },
  habitItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  habitName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  habitDetails: {
    fontSize: 14,
    color: '#555',
  },
});
