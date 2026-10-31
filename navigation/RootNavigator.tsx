import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerNavigator from './DrawerNavigator';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';

export type RootStackParamList = {
  Main: undefined;
  MovieDetails: {
    movieId: string;
    movieTitle: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {
  WatchlistScreen: React.ComponentType;
};

export default function RootNavigator({ WatchlistScreen }: Props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#12121A',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: '#12121A',
        },
      }}
    >
      <Stack.Screen
        name="Main"
        options={{ headerShown: false }}
      >
        {() => (
          <DrawerNavigator WatchlistScreen={WatchlistScreen} />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{
          title: 'Movie Details',
        }}
      />
    </Stack.Navigator>
  );
}