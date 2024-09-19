import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

const tasks = {
  'Flora Identification': {
    question: 'Identify this tree from the following options:',
    options: ['Oak', 'Pine', 'Maple'],
    correctAnswer: 'Oak'
  },
  'Fauna Trivia': {
    question: 'Which of these birds is known for migrating the longest distance?',
    options: ['Arctic Tern', 'Hummingbird', 'Eagle'],
    correctAnswer: 'Arctic Tern'
  },
  // Add more games here...
};

const TriviaQues = ({ route, navigation }) => {
  const { gameKey } = route.params;
  const currentTask = tasks[gameKey];

  const handleAnswerSelection = (selectedAnswer) => {
    if (selectedAnswer === currentTask.correctAnswer) {
      Alert.alert('Correct!', 'You have answered the question correctly.');
    } else {
      Alert.alert('Incorrect', 'Try again!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{gameKey}</Text>
      <Text style={styles.question}>{currentTask.question}</Text>
      <ScrollView style={styles.optionsContainer}>
        {currentTask.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswerSelection(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back to Games</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E0F7FA',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
    color: '#00796B',
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  optionsContainer: {
    flex: 1,
  },
  optionButton: {
    backgroundColor: '#009688',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default TriviaQues;