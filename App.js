import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './login/loginScreen';  // Import your Login Screen
import RegisterScreen from './login/RegisterScreen';  // Import your Register Screen
import HomeScreen from './home/homescreen';  // Your home screen after login
import AddHabitScreen from './habits/addhabits';
import CategoryScreen from './catagory/CategoryScreen'; // Import the CategoryScreen
import ManageHabitsScreen from './home/ManagehabitScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in (check if credentials are stored)
  useEffect(() => {
    const checkLoginStatus = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      const password = await AsyncStorage.getItem('userPassword');
      if (email && password) {
        setIsLoggedIn(true);  // If credentials exist, set the user as logged in
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}  // Hide header for Login screen
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{ headerShown: false }}  // Hide header for Register screen
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}  // Hide header for Home screen
        />
        <Stack.Screen 
          name="Category" 
          component={CategoryScreen}
          options={{ headerShown: true }}  // Hide header for Category screen
        />
        <Stack.Screen 
          name="AddHabit" 
          component={AddHabitScreen}
          options={{ headerShown: true }}  // Hide header for Add Habit screen
        />
        <Stack.Screen name="ManageHabit" 
        component={ManageHabitsScreen} 
        options={{ headerShown: true }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
