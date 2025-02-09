import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './RegisterStyles';  // Importing the styles

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [Name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Validate and register the user
    const handleRegister = async () => {
        // Simple validation checks
        if (!email || !Name || !password || !confirmPassword) {
            Alert.alert('Validation Error', 'Please fill all the fields.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Password Mismatch', 'Passwords do not match.');
            return;
        }

        // Check if user already exists
        try {
            const storedData = await AsyncStorage.getItem('users');
            let users = storedData ? JSON.parse(storedData) : [];

            // Check if email is already registered
            const userExists = users.some(user => user.email === email);
            if (userExists) {
                Alert.alert('Email Taken', 'This email is already registered.');
                return;
            }

            // Add new user to users array
            const newUser = { email, name: Name, password };
            users.push(newUser);

            // Save the updated users list back to AsyncStorage
            await AsyncStorage.setItem('users', JSON.stringify(users));

            Alert.alert('Registration Successful', 'You can now log in!');
            navigation.replace('Login');  // Navigate to Login screen after successful registration
        } catch (error) {
            console.error('Error saving data to AsyncStorage', error);
            Alert.alert('Error', 'Failed to register. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Register</Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                     placeholderTextColor="black"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            
            {/* Name Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="black"
                    value={Name}
                    onChangeText={setName}
                />
            </View>
            
            {/* Password Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                     placeholderTextColor="black"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            
            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                     placeholderTextColor="black"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>
            
            {/* Register Button */}
            <View style={styles.buttonContainer}>
                <Button title="Register" onPress={handleRegister} color="#6200EE" />
            </View>

            {/* Navigate to Login */}
            <View style={styles.loginContainer}>
                <Text>Already have an account? </Text>
                <Text
                    style={styles.linkText}
                    onPress={() => navigation.navigate('Login')}  // Navigate to Login screen
                >
                    Login
                </Text>
            </View>
        </View>
    );
}
