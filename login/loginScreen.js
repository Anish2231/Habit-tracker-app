import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './loginStyles';  // Importing the styles

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // State to hold error messages

  const handleLogin = async () => {
    setError('');  // Clear previous error messages
  
    try {
        const storedData = await AsyncStorage.getItem('users');
        if (!storedData) {
            setError('No users registered yet.');
            return;
        }
  
        let users = JSON.parse(storedData); // Parse the users data
        const user = users.find(u => u.email.trim() === email.trim());

        console.log("Users is ",users)
  
        if (!user) {
            setError('User not found.');
            return;
        }
  
        if (user.password !== password) {
            setError('Incorrect password.');
            return;
        }
  
        // Save user email and user data in AsyncStorage for future use
        await AsyncStorage.setItem('userEmail', email); // Store only the email if needed
        await AsyncStorage.setItem('selectedUser', JSON.stringify(user)); // Store the selected user object
  
        navigation.replace('Home');  // Navigate to Home screen after login
    } catch (e) {
        console.error('Error reading data from AsyncStorage', e);
        setError('Failed to login. Please try again.');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>

      {/* Error Message */}
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

      {/* Login Button */}
      <View style={styles.inputContainer}>
        <Button title="Login" onPress={handleLogin} color="#6200EE" />
      </View>

      {/* Register Link */}
      <View style={styles.registerContainer}>
        <Text>Don't have an account? </Text>
        <Text
          style={styles.registerText}
          onPress={() => navigation.navigate('Register')}
        >
            Register
        </Text>
      </View>
    </View>
  );
}
