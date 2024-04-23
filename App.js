import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Question from './components/Question'
import { myData } from './components/Question'
import SummaryScreen from './components/Summary';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Question">
        <Stack.Screen name="Question" component={Question}
          initialParams={{
            questionNumber: 0,
            userChoices: [],
            data: myData,
          }} />
        <Stack.Screen name="Summary" component={SummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
