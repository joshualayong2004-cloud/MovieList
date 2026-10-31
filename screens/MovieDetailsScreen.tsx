import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useMovies } from '../context/MovieContext';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'MovieDetails'
>;

export default function MovieDetailsScreen({
  route,
  navigation,
}: Props) {
  const { movieId, movieTitle } = route.params;

  const { movies } = useMovies();

  const movie = movies.find((item) => item.id === movieId);

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🎬</Text>

      <Text style={styles.title}>
        Movie Details
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Movie ID
        </Text>
        <Text style={styles.value}>
          {movieId}
        </Text>

        <Text style={styles.label}>
          Movie Title
        </Text>
        <Text style={styles.value}>
          {movieTitle}
        </Text>

        <Text style={styles.label}>
          Genre
        </Text>
        <Text style={styles.value}>
          {movie?.genre ?? 'Not available'}
        </Text>

        <Text style={styles.label}>
          Release Year
        </Text>
        <Text style={styles.value}>
          {movie?.year ?? 'Not available'}
        </Text>

        <Text style={styles.label}>
          Watch Status
        </Text>
        <Text style={styles.value}>
          {movie
            ? movie.watched
              ? 'Watched ✓'
              : 'To Watch'
            : 'Not available'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>
          ← Go Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12121A',
    padding: 24,
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 45,
    textAlign: 'center',
    marginBottom: 15,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#1C1C27',
    borderRadius: 15,
    padding: 24,
    borderWidth: 1,
    borderColor: '#30303D',
    marginBottom: 25,
  },
  label: {
    color: '#A5A5B5',
    fontSize: 13,
    marginBottom: 5,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#E34B5F',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});