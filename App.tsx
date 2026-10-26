
import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import {
  MovieProvider,
  useMovies,
} from './context/MovieContext';

import MovieCard from './components/MovieCard';
import AddMovieForm from './components/AddMovieForm';

type Filter = 'All' | 'To Watch' | 'Watched';

function MovieWatchlistScreen() {
  const { movies, loading, toggleWatched } = useMovies();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('All');
  const [showAddForm, setShowAddForm] = useState(false);

  const watchedCount = movies.filter(
    (movie) => movie.watched
  ).length;

  const toWatchCount = movies.length - watchedCount;

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesFilter =
        filter === 'All' ||
        (filter === 'Watched' && movie.watched) ||
        (filter === 'To Watch' && !movie.watched);

      return matchesSearch && matchesFilter;
    });
  }, [movies, search, filter]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingScreen}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color="#E34B5F" />
        <Text style={styles.loadingText}>
          Loading your movies...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onToggleWatched={toggleWatched}
          />
        )}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <View>
                <Text style={styles.eyebrow}>
                  YOUR PERSONAL COLLECTION
                </Text>
                <Text style={styles.title}>
                  Movie<Text style={styles.accent}>Night</Text>
                </Text>
                <Text style={styles.subtitle}>
                  Your next favorite is waiting.
                </Text>
              </View>

              <View style={styles.headerIcon}>
                <Text style={styles.headerEmoji}>🎬</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  {movies.length}
                </Text>
                <Text style={styles.statLabel}>Total Movies</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  {toWatchCount}
                </Text>
                <Text style={styles.statLabel}>To Watch</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  {watchedCount}
                </Text>
                <Text style={styles.statLabel}>Watched</Text>
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                My Watchlist
              </Text>

              <TouchableOpacity
                style={styles.newButton}
                onPress={() => setShowAddForm(!showAddForm)}
              >
                <Text style={styles.newButtonText}>
                  {showAddForm ? '− Close' : '+ Add Movie'}
                </Text>
              </TouchableOpacity>
            </View>

            {showAddForm && <AddMovieForm />}

            <TextInput
              style={styles.searchInput}
              placeholder="Search your movies..."
              placeholderTextColor="#858594"
              value={search}
              onChangeText={setSearch}
              clearButtonMode="while-editing"
              accessibilityLabel="Search movies"
            />

            <View style={styles.filterRow}>
              {(['All', 'To Watch', 'Watched'] as Filter[]).map(
                (item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setFilter(item)}
                    style={[
                      styles.filterButton,
                      filter === item && styles.activeFilter,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        filter === item && styles.activeFilterText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>

            <Text style={styles.resultsText}>
              {filteredMovies.length} movie
              {filteredMovies.length !== 1 ? 's' : ''}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🍿</Text>
            <Text style={styles.emptyTitle}>No movies found</Text>
            <Text style={styles.emptyText}>
              Try another search or add a movie to your list.
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <MovieProvider>
      <MovieWatchlistScreen />
    </MovieProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#12121A',
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: '#12121A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#B7B7C5',
    marginTop: 14,
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 36,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  eyebrow: {
    color: '#E34B5F',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 7,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
  },
  accent: {
    color: '#E34B5F',
  },
  subtitle: {
    color: '#A5A5B5',
    fontSize: 13,
    marginTop: 5,
  },
  headerIcon: {
    backgroundColor: '#30243C',
    height: 58,
    width: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerEmoji: {
    fontSize: 28,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1C1C27',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#30303D',
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  statLabel: {
    color: '#A5A5B5',
    fontSize: 10,
    marginTop: 5,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
  },
  newButton: {
    backgroundColor: '#E34B5F',
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 9,
  },
  newButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  searchInput: {
    backgroundColor: '#1C1C27',
    borderWidth: 1,
    borderColor: '#30303D',
    borderRadius: 12,
    color: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginBottom: 13,
    fontSize: 14,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#252531',
  },
  activeFilter: {
    backgroundColor: '#E34B5F',
  },
  filterText: {
    color: '#B7B7C5',
    fontSize: 12,
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  resultsText: {
    color: '#A5A5B5',
    fontSize: 12,
    marginBottom: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  emptyEmoji: {
    fontSize: 38,
    marginBottom: 12,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  emptyText: {
    color: '#A5A5B5',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});
