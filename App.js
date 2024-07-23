import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screen/HomeScreen';
import SearchScreen from './screen/SearchScreen';
import DetailsScreen from './screen/DetailsScreen';
import SplashScreen from './screen/SplashScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Details" component={DetailsScreen} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
