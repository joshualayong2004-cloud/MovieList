import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

export default function ProfileScreen() {
  const [username, setUsername] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>👤</Text>
      <Text style={styles.title}>My Profile</Text>

      <Text style={styles.label}>Username</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        placeholderTextColor="#858594"
        value={username}
        onChangeText={setUsername}
      />

      <View style={styles.card}>
        <Text style={styles.welcome}>
          Welcome, {username || 'Guest'}!
        </Text>

        <Text style={styles.description}>
          Enjoy managing your personal movie collection.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12121A',
    padding: 24,
  },
  emoji: {
    fontSize: 48,
    textAlign: 'center',
    marginTop: 30,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 35,
  },
  label: {
    color: '#A5A5B5',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#1C1C27',
    color: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#30303D',
  },
  card: {
    backgroundColor: '#1C1C27',
    padding: 22,
    borderRadius: 12,
    marginTop: 25,
  },
  welcome: {
    color: '#E34B5F',
    fontSize: 21,
    fontWeight: 'bold',
  },
  description: {
    color: '#A5A5B5',
    marginTop: 12,
    lineHeight: 22,
  },
});