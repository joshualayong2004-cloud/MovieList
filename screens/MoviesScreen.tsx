import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useMovies } from '../context/MovieContext';
import type { RootStackParamList } from '../navigation/RootNavigator';

export default function MoviesScreen() {
  const { movies, loading } = useMovies();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#E34B5F" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>🎥 Movies</Text>
            <Text style={styles.subtitle}>
              Select a movie to see its details.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('MovieDetails', {
                movieId: item.id,
                movieTitle: item.title,
              })
            }
          >
            <Text style={styles.movieTitle}>{item.title}</Text>

            <Text style={styles.info}>
              {item.genre} • {item.year}
            </Text>

            <Text style={styles.status}>
              {item.watched ? '✓ Watched' : '◷ To Watch'}
            </Text>

            <Text style={styles.link}>View Details →</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.subtitle}>
            No movies available. Add one from your Watchlist!
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12121A',
  },
  list: {
    padding: 20,
    paddingBottom: 35,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    color: '#A5A5B5',
    fontSize: 14,
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#1C1C27',
    padding: 20,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#30303D',
  },
  movieTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  info: {
    color: '#A5A5B5',
    fontSize: 14,
  },
  status: {
    color: '#E34B5F',
    marginTop: 10,
    fontWeight: '600',
  },
  link: {
    color: '#FFFFFF',
    marginTop: 15,
    fontWeight: 'bold',
  },
});