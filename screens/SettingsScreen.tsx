import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
} from 'react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Settings</Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Enable Notifications
        </Text>

        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{
            false: '#555566',
            true: '#E34B5F',
          }}
          thumbColor="#FFFFFF"
        />
      </View>

      <Text style={styles.status}>
        Notifications are {notifications ? 'ON' : 'OFF'}
      </Text>

      <Text style={styles.note}>
        This is a sample settings control for
        the navigation activity.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12121A',
    padding: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#1C1C27',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  status: {
    color: '#E34B5F',
    fontSize: 16,
    marginTop: 20,
  },
  note: {
    color: '#A5A5B5',
    marginTop: 15,
    lineHeight: 22,
  },
});