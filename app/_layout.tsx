import { TaskContextProvider } from '@/context/TaskContext';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';



export default function RootLayout() {
 
    

  return (
    <TaskContextProvider>

      <Stack
        screenOptions={{
        headerShown:false}}/>
    </TaskContextProvider>
    
  );
}
