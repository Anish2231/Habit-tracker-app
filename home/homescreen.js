import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styles from '../home/homestyle';

export default function HomeScreen() {
  const [habits, setHabits] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [userName, setUserName] = useState('');
  const [score, setScore] = useState(0);
  const navigation = useNavigation();

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = (today.getMonth() + 1).toString().padStart(2, '0');
    const dd = today.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const loadData = async () => {
    try {
      const [selectedUserData, habitsFromStorage, userScore] = await Promise.all([
        AsyncStorage.getItem('selectedUser'),
        AsyncStorage.getItem('habits'),
        AsyncStorage.getItem('score'),
      ]);

      if (selectedUserData) {
        const user = JSON.parse(selectedUserData);
        setUserName(user.name);
      }

      if (habitsFromStorage) {
        setHabits(JSON.parse(habitsFromStorage));
      }

      if (userScore) {
        setScore(parseInt(userScore, 10));
      }

      setSelectedDate(getTodayDate());
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const calculateStreak = (completedDates) => {
    const sortedDates = completedDates
      .map((date) => new Date(date))
      .sort((a, b) => b - a);
    let streak = 0;
    const today = new Date(getTodayDate());

    for (let i = 0; i < sortedDates.length; i++) {
      const diffDays = Math.floor(
        (today - sortedDates[i]) / (1000 * 60 * 60 * 24)
      );
      if (diffDays === streak) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const getLastCompletedDate = (completedDates) => {
    if (completedDates.length === 0) return null;
    const lastDate = new Date(Math.max(...completedDates.map(date => new Date(date))));
    return lastDate.toLocaleDateString();
  };

  const awardBadges = (habit, streak) => {
    let updatedHabit = { ...habit };
    let badges = updatedHabit.badges || [];

    if (streak >= 10 && !badges.includes('10_days')) {
      badges.push('10_days');
      Alert.alert('Congratulations!', `You have earned the 10-day streak badge for ${habit.name}!`);
    }
    if (streak >= 30 && !badges.includes('30_days')) {
      badges.push('30_days');
      Alert.alert('Awesome!', `You have earned the 30-day streak badge for ${habit.name}!`);
    }
    if (streak >= 50 && !badges.includes('50_days')) {
      badges.push('50_days');
      Alert.alert('Incredible!', `You have earned the 50-day streak badge for ${habit.name}!`);
    }
    if (streak >= 100 && !badges.includes('100_days')) {
      badges.push('100_days');
      Alert.alert('Amazing!', `You have earned the 100-day streak badge for ${habit.name}!`);
    }

    updatedHabit.badges = badges;
    return updatedHabit;
  };

  const markComplete = async (id) => {
    try {
      const habitsFromStorage = await AsyncStorage.getItem('habits');
      const habitsArray = habitsFromStorage ? JSON.parse(habitsFromStorage) : [];

      const habitIndex = habitsArray.findIndex((habit) => habit.id === id);
      if (habitIndex === -1) return;

      const habit = habitsArray[habitIndex];
      const today = getTodayDate();

      if (!habit.completedDates.includes(today)) {
        habit.completedDates.push(today);

        // Increment the score
        const newScore = score + 10;
        setScore(newScore);
        await AsyncStorage.setItem('score', newScore.toString());

        // Check streak and award badges
        const streak = calculateStreak(habit.completedDates);
        const updatedHabit = awardBadges(habit, streak);

        habitsArray[habitIndex] = updatedHabit;
        await AsyncStorage.setItem('habits', JSON.stringify(habitsArray));
        setHabits([...habitsArray]);
      }
    } catch (error) {
      console.error('Error marking habit as complete:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('selectedUser');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userName}>{`Hello, ${userName}`}</Text>
        <Text style={styles.userScore}>{`Score: ${score}`}</Text>
      </View>

      <View style={styles.logoutContainer}>
        <Button title="Logout" onPress={handleLogout} color="#6200EE" />
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: '#6200EE',
              selectedTextColor: '#ffffff',
            },
          }}
          theme={{
            selectedDayBackgroundColor: '#6200EE',
            selectedDayTextColor: '#fff',
            todayTextColor: '#ff6347',
            arrowColor: '#6200EE',
          }}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddHabit')}
        >
          <Text style={styles.buttonText}>Add Habit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Category')}
        >
          <Text style={styles.buttonText}>Go to Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ManageHabit')}  // Navigate to ManageHabitScreen
        >
          <Text style={styles.buttonText}>Manage Habits</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.noHabitsText}>No habits available</Text>}
        renderItem={({ item }) => {
          const streak = calculateStreak(item.completedDates);
          const today = getTodayDate();
          const isCompletedToday = item.completedDates.includes(today);
          const lastCompletedDate = getLastCompletedDate(item.completedDates);

          return (
            <View style={[styles.habitItemContainer, isCompletedToday && styles.completedHabit]}>
              <Text style={[styles.habitItemText, isCompletedToday && styles.completedText]}>{item.name}</Text>
              <Text style={styles.habitItemStreak}>{`Streak: ${streak} days`}</Text>
              {lastCompletedDate && <Text style={styles.habitItemStreak}>{`Last Completed: ${lastCompletedDate}`}</Text>}

              {item.badges && item.badges.includes('10_days') && <Text style={styles.badgeText}>🏅 10 Days Streak Badge</Text>}
              {item.badges && item.badges.includes('30_days') && <Text style={styles.badgeText}>🏅 30 Days Streak Badge</Text>}
              {item.badges && item.badges.includes('50_days') && <Text style={styles.badgeText}>🏅 50 Days Streak Badge</Text>}
              {item.badges && item.badges.includes('100_days') && <Text style={styles.badgeText}>🏅 100 Days Streak Badge</Text>}

              <TouchableOpacity
                style={[styles.completeButton, { backgroundColor: isCompletedToday ? '#ccc' : '#6200EE' }]}
                onPress={() => markComplete(item.id)}
                disabled={isCompletedToday}
              >
                <Text style={styles.completeButtonText}>
                  {isCompletedToday ? 'Completed' : 'Mark Complete'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}
