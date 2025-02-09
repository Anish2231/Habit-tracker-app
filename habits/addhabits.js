import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './habitstyles'; // Adjust the path to your styles

export default function AddHabitScreen({ navigation }) {
  const [habitName, setHabitName] = useState('');
  const [habitType, setHabitType] = useState('');
  const [frequency, setFrequency] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF'); // Default to white
  const [selectedDate, setSelectedDate] = useState(getCurrentDate()); // Get current date by default
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(generateDateOptions());

  // Function to get current date in YYYY-MM-DD format
  function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Generate date options for dropdown (last 7 days, for example)
  function generateDateOptions() {
    const options = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      options.push({ label: `${year}-${month}-${day}`, value: `${year}-${month}-${day}` });
    }
    return options;
  }

  const saveHabit = async () => {
    console.log("Selected date is ", selectedDate);
  
    // Check for empty fields
    if (!habitName.trim() || !habitType || !frequency || !backgroundColor) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
  
    try {
      // Retrieve existing habits from AsyncStorage
      const habits = await AsyncStorage.getItem('habits');
      const habitsArray = habits ? JSON.parse(habits) : []; // Initialize as an empty array if no habits exist
  
      // Create the new habit object without completed dates
      const newHabit = {
        id: Date.now().toString(), // Unique ID for the habit
        name: habitName.trim(),
        type: habitType,
        frequency,
        backgroundColor,
        progress: 0, // Default progress
        completedDates: [], // Initialize without any completed date
      };
  
      // Add the new habit to the habits array
      habitsArray.push(newHabit);
  
      // Save the updated habits array back to AsyncStorage
      await AsyncStorage.setItem('habits', JSON.stringify(habitsArray));
  
      // Immediately check if the data is saved correctly
      const savedHabits = await AsyncStorage.getItem('habits');
      console.log('Updated Habits in AsyncStorage:', savedHabits);
  
      // Navigate back to the home screen
      navigation.goBack();
    } catch (error) {
      console.error('Error saving habit', error);
    }
  };

  // List of inputs to render
  const inputFields = [
    {
      component: <TextInput style={styles.input} placeholder="Enter habit name"  placeholderTextColor="black" value={habitName} onChangeText={setHabitName} />,
    },
    {
      component: (
        <DropDownPicker
          open={open}
          value={habitType}
          items={[
            { label: 'Selfcare', value: 'Selfcare' },
            { label: 'Outdoor', value: 'Outdoor' },
            { label: 'Home', value: 'Home' },
            { label: 'Other', value: 'Other' },
          ]}
          setOpen={setOpen}
          setValue={setHabitType}
          placeholder="Select Habit Type"
          searchPlaceholderTextColor="black"
        
          style={styles.dropdown}
          dropDownStyle={styles.dropdownList}
        />
      ),
    },
    {
      component: <TextInput style={styles.input} 
      
      placeholder="Enter frequency (e.g., Daily, Weekly)"
      placeholderTextColor="black"
      value={frequency} onChangeText={setFrequency} />,
    },
    {
      component: <TextInput style={styles.input} placeholder="Enter background color (Hex code)"  placeholderTextColor="black" value={backgroundColor} onChangeText={setBackgroundColor} />,
    },
  ];

  return (
    <FlatList
      data={inputFields}
      renderItem={({ item }) => item.component}
      ListHeaderComponent={<View style={styles.header}><Text style={styles.headerTitle}>Add New Habit</Text></View>}
      ListFooterComponent={
        <Button title="Save Habit" onPress={saveHabit} color="#6200EE" />
      }
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
    />
  );
}
