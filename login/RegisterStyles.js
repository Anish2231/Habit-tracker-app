import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2', // Same light background color as Login
    padding: 30,
  },
  header: {
    fontSize: 36,
    fontWeight: '600',
    marginBottom: 40,
    color: '#4C73B3', // Same calm blue as Login header
    textAlign: 'center', // Centered header for alignment
    fontFamily: 'Arial', // Consistent font with Login
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 55,
    borderColor: '#4C73B3', // Same border color as Login
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333', // Dark text for readability
    fontFamily: 'Arial', // Clean, readable font
  },
  inputError: {
    borderColor: '#E74C3C', // Red border for errors (same as Login)
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: '#4C73B3', // Same blue for the button as Login header
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5, // Adding shadow effect for the button
  },
  button: {
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1.2, // Adding spacing between characters
    fontFamily: 'Arial', // Consistent modern font style
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20, // Spacing from the button
  },
  linkText: {
    fontSize: 16,
    color: '#4C73B3', // Same blue as login for consistency
    fontWeight: '600',
    textDecorationLine: 'underline', // Underlined to indicate it's clickable
    fontFamily: 'Arial', // Same font as login
  },
  errorMessage: {
    color: '#E74C3C', // Red color for error messages
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center', // Center error message
  },
});
