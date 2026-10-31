import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TabNavigator from './TabNavigator';
import AboutScreen from '../screens/AboutScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Drawer = createDrawerNavigator();

type Props = {
  WatchlistScreen: React.ComponentType;
};

export default function DrawerNavigator({ WatchlistScreen }: Props) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#12121A',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#1C1C27',
        },
        drawerActiveTintColor: '#E34B5F',
        drawerInactiveTintColor: '#FFFFFF',
        drawerActiveBackgroundColor: '#30243C',
        sceneStyle: {
          backgroundColor: '#12121A',
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        options={{
          title: 'MovieNight',
          drawerLabel: 'Home',
        }}
      >
        {() => (
          <TabNavigator WatchlistScreen={WatchlistScreen} />
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="About"
        component={AboutScreen}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  );
}