
import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import type { Movie } from '../data/movies';

type MovieCardProps = {
  movie: Movie;
  onToggleWatched: (id: string) => void;
};

export default function MovieCard({
  movie,
  onToggleWatched,
}: MovieCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.poster}>
        <Text style={styles.posterIcon}>🎬</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>
          {movie.title}
        </Text>

        <Text style={styles.subtitle}>
          {movie.year} · {movie.genre}
        </Text>

        <View
          style={[
            styles.status,
            movie.watched
              ? styles.watchedStatus
              : styles.pendingStatus,
          ]}
        >
          <Text style={styles.statusText}>
            {movie.watched
              ? '✓ Watched'
              : '🍿 On My Watchlist'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          movie.watched && styles.watchedButton,
        ]}
        onPress={() => onToggleWatched(movie.id)}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={
          movie.watched
            ? `Move ${movie.title} back to your watchlist`
            : `Mark ${movie.title} as watched`
        }
      >
        <Text style={styles.buttonText}>
          {movie.watched ? '✓ Watched' : 'Watch Next 🍿'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C27',
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#30303D',
  },

  poster: {
    width: 58,
    height: 78,
    borderRadius: 10,
    backgroundColor: '#30243C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  posterIcon: {
    fontSize: 28,
  },

  details: {
    flex: 1,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 7,
  },

  subtitle: {
    color: '#A5A5B5',
    fontSize: 12,
    marginBottom: 9,
  },

  status: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  watchedStatus: {
    backgroundColor: '#164A37',
  },

  pendingStatus: {
    backgroundColor: '#41351D',
  },

  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },

  button: {
    backgroundColor: '#E34B5F',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 9,
    marginLeft: 8,
  },

  watchedButton: {
    backgroundColor: '#164A37',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
