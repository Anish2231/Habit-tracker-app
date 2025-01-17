import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2', // Light background color for a fresh look
    padding: 30,
  },
  header: {
    fontSize: 36,
    fontWeight: '600',
    marginBottom: 40,
    color: '#4C73B3', // A calm, professional blue
    textAlign: 'center',  // Centered header for better alignment
    fontFamily: 'Arial', // Clean and modern font
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 55,
    borderColor: '#4C73B3',
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333', // Dark text for readability
    fontFamily: 'Arial', // Clean and readable font
  },
  inputError: {
    borderColor: '#E74C3C', // Red border for errors
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: '#4C73B3', // Same blue for button to match header
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5, // Shadow effect for button
  },
  button: {
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1.2, // Space between characters for a clean look
    fontFamily: 'Arial', // Modern font style
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20, // Spacing from the button
  },
  registerText: {
    fontSize: 16,
    color: '#4C73B3',
    fontWeight: '600',
    textDecorationLine: 'underline', // Underlined to indicate clickable text
    fontFamily: 'Arial', // Clean, readable font
  },
  errorMessage: {
    color: '#E74C3C', // Red color for error message
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center', // Center error message
  },
});
