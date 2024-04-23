import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

function SummaryScreen({ route }) {
  const { userChoices, data } = route.params;

  const renderChoiceStyle = (choiceIndex, correct, userChoice) => {
    if (Array.isArray(correct)) {
      if (correct.includes(choiceIndex)) {
        return styles.correctChoice; 
      } else if (userChoice.includes(choiceIndex)) {
        return styles.wrongChoice;
      }
    } else {
      if (choiceIndex === correct) {
        return styles.correctChoice;
      } else if (choiceIndex === userChoice[0]) {
        return styles.wrongChoice; 
      }
    }
    return {};
  };

const calculateScoreAndRenderChoices = () => {
    let score = 0;
    const renderedQuestions = data.map((question, index) => {
      const userChoice = userChoices[index];
      let isCorrect = false;

      if (Array.isArray(question.correct)) {
        isCorrect = question.correct.every(choice => userChoice.includes(choice)) && question.correct.length === userChoice.length;
      } else {
        isCorrect = question.correct === userChoice[0];
      }

      if (isCorrect) score += 1;

      return (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.prompt}</Text>
          {question.choices.map((choice, choiceIndex) => {
            const choiceStyle = renderChoiceStyle(choiceIndex, question.correct, userChoice);
            return <Text key={choiceIndex} style={[styles.choiceText, choiceStyle]}>{choice}</Text>;
          })}
        </View>
      );
    });

    return { score, renderedQuestions };
  };

  const { score, renderedQuestions } = calculateScoreAndRenderChoices();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.scoreText} testID="total">Your score is: {score} / {data.length}</Text>
      {renderedQuestions}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  choiceText: {
    fontSize: 14,
  },
  correctChoice: {
    fontWeight: 'bold',
    color: 'green',
  },
  wrongChoice: {
    textDecorationLine: 'line-through',
    color: 'red',
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default SummaryScreen;
