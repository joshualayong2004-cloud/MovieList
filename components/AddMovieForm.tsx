
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { useMovies } from '../context/MovieContext';

const genres = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Sci-Fi',
  'Animation',
  'Romance',
];

export default function AddMovieForm() {
  const { addMovie } = useMovies();

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('2026');
  const [genre, setGenre] = useState('Action');

  const handleAddMovie = () => {
    const trimmedTitle = title.trim();
    const movieYear = Number(year);

    if (!trimmedTitle) {
      Alert.alert('Missing title', 'Enter a movie title.');
      return;
    }

    if (
      !/^\d{4}$/.test(year) ||
      movieYear < 1888 ||
      movieYear > 2100
    ) {
      Alert.alert(
        'Invalid year',
        'Enter a valid four-digit year between 1888 and 2100.'
      );
      return;
    }

    addMovie(trimmedTitle, genre, movieYear);

    setTitle('');
    setYear('2026');
    setGenre('Action');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add a movie</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter movie title..."
        placeholderTextColor="#858594"
        value={title}
        onChangeText={setTitle}
        maxLength={100}
      />

      <TextInput
        style={styles.input}
        placeholder="Release year"
        placeholderTextColor="#858594"
        value={year}
        onChangeText={setYear}
        keyboardType="number-pad"
        maxLength={4}
      />

      <Text style={styles.label}>Choose a genre</Text>

      <View style={styles.genreContainer}>
        {genres.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setGenre(item)}
            style={[
              styles.genreButton,
              genre === item && styles.selectedGenre,
            ]}
          >
            <Text
              style={[
                styles.genreText,
                genre === item && styles.selectedGenreText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddMovie}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>
          + Add to Watchlist
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C27',
    padding: 16,
    borderRadius: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#30303D',
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 14,
  },
  input: {
    backgroundColor: '#12121A',
    borderWidth: 1,
    borderColor: '#393947',
    color: '#FFFFFF',
    paddingHorizontal: 13,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 11,
    fontSize: 14,
  },
  label: {
    color: '#B7B7C5',
    fontSize: 12,
    marginBottom: 9,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  genreButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#30303D',
  },
  selectedGenre: {
    backgroundColor: '#E34B5F',
  },
  genreText: {
    color: '#D1D1DC',
    fontSize: 12,
  },
  selectedGenreText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  addButton: {
    backgroundColor: '#E34B5F',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
