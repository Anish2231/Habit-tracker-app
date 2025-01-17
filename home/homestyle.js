const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  userScore: {
    fontSize: 16,
  },
  calendarContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  habitItemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  habitItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  habitItemStreak: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  badgeText: {
    fontSize: 14,
    color: '#6200EE',
    marginTop: 5,
  },
  completeButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  completeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  noHabitsText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
  completedHabit: {
    backgroundColor: '#e0e0e0',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
};

export default styles;
