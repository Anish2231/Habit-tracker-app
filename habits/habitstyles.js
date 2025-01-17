import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F6F9', // Soft background color for the screen
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  input: {
    height: 50,
    borderColor: '#6200EE',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 15,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  dropdown: {
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#6200EE',
  },
  dropdownList: {
    borderColor: '#6200EE',
    borderRadius: 10,
  },
});
