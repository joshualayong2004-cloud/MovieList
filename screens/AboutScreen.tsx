import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🍿</Text>

      <Text style={styles.title}>
        About MovieNight
      </Text>

      <Text style={styles.description}>
        MovieNight is a personal movie watchlist
        application developed using React Native
        and Expo.
      </Text>

      <Text style={styles.description}>
        Users can add movies, search their collection,
        and track which movies they have watched.
      </Text>

      <View style={styles.card}>
        <Text style={styles.heading}>
          Navigation Features
        </Text>

        <Text style={styles.item}>✓ Stack Navigator</Text>
        <Text style={styles.item}>✓ Tab Navigator</Text>
        <Text style={styles.item}>✓ Drawer Navigator</Text>
        <Text style={styles.item}>✓ Passing Parameters</Text>
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
    fontSize: 45,
    textAlign: 'center',
    marginTop: 30,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  description: {
    color: '#A5A5B5',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#1C1C27',
    padding: 22,
    borderRadius: 14,
    marginTop: 15,
  },
  heading: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 18,
  },
  item: {
    color: '#E34B5F',
    fontSize: 16,
    marginBottom: 12,
  },
});