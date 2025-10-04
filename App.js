import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DateTimePicker from './src/screens/DateTimePickerScreen';
import UpdateMeeting from './src/screens/UpdateMeetingScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator 
          initialRouteName="DateTimePicker"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen 
            name="DateTimePicker" 
            component={DateTimePicker} 
          />
          <Stack.Screen 
            name="UpdateMeeting" 
            component={UpdateMeeting} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
