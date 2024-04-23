import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const myData = [
  {
    prompt: "What does Hakuna Matata mean?",
    type: "multiple-choice",
    choices: ["No worries!", "Hello!", "I love you!", "Good-bye!"],
    correct: 0,
  },
  {
    prompt: "What are the names of the main characters in Aladdin?",
    type: "multiple-answer",
    choices: ["Aladdin", "Woody", "Jasmine", "Buzz Lightyear"],
    correct: [0, 2],
  },
  {
    prompt: "Mickey Mouse was the first cartoon character made by Walt Disney.",
    type: "true-false",
    choices: ["True", "False"],
    correct: 1,
  },
];

const Question = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(() => myData.map(() => null));
  const currentQuestion = myData[currentIndex];

  useEffect(() => {
    console.log('Updated answers: ', answers);
  }, [answers]);

  const handleSelect = (index) => {
    console.log(`Question ${currentIndex + 1} option selected: ${index}`);
    setAnswers((prevAnswers) => {
      let updatedAnswers = [...prevAnswers];
  
      if (currentQuestion.type === 'multiple-answer') {
        let currentAnswers = Array.isArray(updatedAnswers[currentIndex]) ? updatedAnswers[currentIndex] : [];
        
        if (currentAnswers.includes(index)) {
          currentAnswers = currentAnswers.filter((idx) => idx !== index);
        } else {
          currentAnswers.push(index);
        }
  
        updatedAnswers[currentIndex] = currentAnswers;
      } else {
        updatedAnswers[currentIndex] = [index];
      }
  
      return updatedAnswers;
    });
  };

const goToNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < myData.length) {
      setCurrentIndex(nextIndex);
    } else {
      console.log('Final Answers: ', answers);
      navigation.navigate('Summary', { userChoices: answers, data: myData });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{currentQuestion.prompt}</Text>
      {currentQuestion.choices.map((choice, index) => (
        <Button key={index} title={choice} onPress={() => handleSelect(index)} />
      ))}
      <Button
        title="Next"
        onPress={goToNext}
        disabled={answers[currentIndex] === null || (Array.isArray(answers[currentIndex]) && answers[currentIndex].length === 0)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  questionText: {
    marginBottom: 20,
    fontSize: 18,
  },
});

export default Question;