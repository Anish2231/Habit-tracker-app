import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userScore: {
    fontSize: 18,
    color: '#6200EE',
    fontWeight: '600',
  },
  logoutContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  calendarContainer: {
    marginBottom: 30,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 12,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  habitItemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  habitItemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  habitItemStreak: {
    fontSize: 14,
    color: '#888',
    marginVertical: 8,
  },
  badgeText: {
    fontSize: 16,
    color: '#4caf50',
    marginTop: 5,
  },
  completeButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  noHabitsText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
  completedHabit: {
    backgroundColor: '#E0E0E0',
    borderColor: '#BDBDBD',
  },
  completedText: {
    color: '#BDBDBD',
    textDecorationLine: 'line-through',
  },
});
