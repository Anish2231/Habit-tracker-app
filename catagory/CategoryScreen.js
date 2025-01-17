import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CategoryScreen() {
  const [categorizedHabits, setCategorizedHabits] = useState([]);
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

    // Transforming to format suitable for SectionList
    return Object.keys(categorized).map((category) => ({
      title: category,
      data: categorized[category],
    }));
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
        <Text style={styles.loadingText}>Loading habits...</Text>
      </View>
    );
  }

  // If no habits are found, display a message
  if (categorizedHabits.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noHabitsText}>No categorized habits available.</Text>
      </View>
    );
  }

  return (
    <SectionList
      sections={categorizedHabits}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.habitItem}>
          <Text style={styles.habitName}>{item.name}</Text>
          <Text style={styles.habitDetails}>
            Streak: <Text style={styles.streakCount}>{item.completedDates.length} days</Text>
          </Text>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.categoryTitle}>{title}</Text>
      )}
      contentContainerStyle={styles.contentContainer} // Added content container styling
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    paddingBottom: 20, // Adjust to provide some space at the bottom
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  habitItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  habitName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  habitDetails: {
    fontSize: 14,
    color: '#888',
  },
  streakCount: {
    fontWeight: 'bold',
    color: '#6200EE',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6200EE',
  },
  noHabitsText: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});
