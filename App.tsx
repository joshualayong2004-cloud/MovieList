
import 'react-native-gesture-handler';

import React, { useMemo, useState } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Switch,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import {
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Ionicons from '@expo/vector-icons/Ionicons';

import {
  MovieProvider,
  useMovies,
} from './context/MovieContext';

import MovieCard from './components/MovieCard';
import AddMovieForm from './components/AddMovieForm';

// ==========================================
// NAVIGATION TYPES
// ==========================================

type RootStackParamList = {
  Main: undefined;
  MovieDetails: {
    movieId: string;
    movieTitle: string;
  };
};

type Filter = 'All' | 'To Watch' | 'Watched';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


// ==========================================
// 1. WATCHLIST SCREEN (YOUR ORIGINAL APP)
// ==========================================

function MovieWatchlistScreen() {
  const { movies, loading, toggleWatched } = useMovies();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
          <View>
            <MovieCard
              movie={item}
              onToggleWatched={toggleWatched}
            />

            {/* STACK NAVIGATION + PASSING PARAMETERS */}
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() =>
                navigation.navigate('MovieDetails', {
                  movieId: item.id,
                  movieTitle: item.title,
                })
              }
            >
              <Text style={styles.detailsButtonText}>
                View Details →
              </Text>
            </TouchableOpacity>
          </View>
        )}

        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <View>
                <Text style={styles.eyebrow}>
                  YOUR PERSONAL COLLECTION
                </Text>

                <Text style={styles.title}>
                  Movie
                  <Text style={styles.accent}>
                    Night
                  </Text>
                </Text>

                <Text style={styles.subtitle}>
                  Your next favorite is waiting.
                </Text>
              </View>

              <View style={styles.headerIcon}>
                <Text style={styles.headerEmoji}>
                  🎬
                </Text>
              </View>
            </View>

            {/* MOVIE STATISTICS */}
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  {movies.length}
                </Text>
                <Text style={styles.statLabel}>
                  Total Movies
                </Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  {toWatchCount}
                </Text>
                <Text style={styles.statLabel}>
                  To Watch
                </Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  {watchedCount}
                </Text>
                <Text style={styles.statLabel}>
                  Watched
                </Text>
              </View>
            </View>

            {/* ADD MOVIE */}
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

            {/* SEARCH */}
            <TextInput
              style={styles.searchInput}
              placeholder="Search your movies..."
              placeholderTextColor="#858594"
              value={search}
              onChangeText={setSearch}
              clearButtonMode="while-editing"
              accessibilityLabel="Search movies"
            />

            {/* FILTERS */}
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

            <Text style={styles.emptyTitle}>
              No movies found
            </Text>

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


// ==========================================
// 2. MOVIES SCREEN (BOTTOM TAB)
// ==========================================

function MoviesScreen() {
  const { movies, loading } = useMovies();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (loading) {
    return (
      <View style={screenStyles.container}>
        <ActivityIndicator size="large" color="#E34B5F" />
      </View>
    );
  }

  return (
    <View style={screenStyles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}

        ListHeaderComponent={
          <View>
            <Text style={screenStyles.title}>
              🎥 Movie Collection
            </Text>

            <Text style={screenStyles.description}>
              Browse your movies and select one to view its details.
            </Text>
          </View>
        }

        renderItem={({ item }) => (
          <TouchableOpacity
            style={screenStyles.card}
            onPress={() =>
              navigation.navigate('MovieDetails', {
                movieId: item.id,
                movieTitle: item.title,
              })
            }
          >
            <Text style={screenStyles.movieTitle}>
              {item.title}
            </Text>

            <Text style={screenStyles.description}>
              Genre: {item.genre}
            </Text>

            <Text style={screenStyles.description}>
              Year: {item.year}
            </Text>

            <Text style={screenStyles.highlight}>
              {item.watched ? '✓ Watched' : '◷ To Watch'}
            </Text>

            <Text style={screenStyles.link}>
              View Details →
            </Text>
          </TouchableOpacity>
        )}

        ListEmptyComponent={
          <Text style={screenStyles.description}>
            No movies available. Add one from your Watchlist!
          </Text>
        }
      />
    </View>
  );
}


// ==========================================
// 3. PROFILE SCREEN (BOTTOM TAB)
// ==========================================

function ProfileScreen() {
  const [username, setUsername] = useState('');

  return (
    <ScrollView
      style={screenStyles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={screenStyles.emoji}>
        👤
      </Text>

      <Text style={screenStyles.title}>
        My Profile
      </Text>

      <Text style={screenStyles.description}>
        Enter your username below.
      </Text>

      <TextInput
        style={screenStyles.input}
        placeholder="Enter username"
        placeholderTextColor="#858594"
        value={username}
        onChangeText={setUsername}
      />

      <View style={screenStyles.card}>
        <Text style={screenStyles.movieTitle}>
          Welcome, {username || 'Guest'}!
        </Text>

        <Text style={screenStyles.description}>
          Enjoy managing your personal movie collection.
        </Text>
      </View>
    </ScrollView>
  );
}


// ==========================================
// 4. ABOUT SCREEN (DRAWER)
// ==========================================

function AboutScreen() {
  return (
    <ScrollView
      style={screenStyles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={screenStyles.emoji}>
        🍿
      </Text>

      <Text style={screenStyles.title}>
        About MovieNight
      </Text>

      <Text style={screenStyles.description}>
        MovieNight is a personal movie watchlist
        application developed using React Native
        and Expo.
      </Text>

      <Text style={screenStyles.description}>
        Users can add movies, search their collection,
        filter movies, and mark movies as watched.
      </Text>

      <View style={screenStyles.card}>
        <Text style={screenStyles.movieTitle}>
          Navigation Features
        </Text>

        <Text style={screenStyles.highlight}>
          ✓ Stack Navigator
        </Text>

        <Text style={screenStyles.highlight}>
          ✓ Tab Navigator
        </Text>

        <Text style={screenStyles.highlight}>
          ✓ Drawer Navigator
        </Text>

        <Text style={screenStyles.highlight}>
          ✓ Passing Parameters
        </Text>
      </View>
    </ScrollView>
  );
}


// ==========================================
// 5. SETTINGS SCREEN (DRAWER)
// ==========================================

function SettingsScreen() {
  const [notifications, setNotifications] = useState(false);

  return (
    <View style={[screenStyles.container, { padding: 24 }]}>
      <Text style={screenStyles.title}>
        ⚙️ Settings
      </Text>

      <View style={screenStyles.settingsRow}>
        <Text style={screenStyles.movieTitle}>
          Notifications
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

      <Text style={screenStyles.description}>
        Notifications are currently{' '}
        {notifications ? 'ON' : 'OFF'}.
      </Text>

      <Text style={screenStyles.description}>
        This is a sample settings control for
        the navigation activity.
      </Text>
    </View>
  );
}


// ==========================================
// 6. MOVIE DETAILS SCREEN
// STACK + PASSING PARAMETERS
// ==========================================

type DetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'MovieDetails'
>;

function MovieDetailsScreen({
  route,
  navigation,
}: DetailsProps) {
  // RECEIVE PARAMETERS FROM THE PREVIOUS SCREEN
  const { movieId, movieTitle } = route.params;

  const { movies } = useMovies();

  const movie = movies.find(
    (item) => item.id === movieId
  );

  return (
    <ScrollView
      style={screenStyles.container}
      contentContainerStyle={{
        padding: 24,
        flexGrow: 1,
        justifyContent: 'center',
      }}
    >
      <Text style={screenStyles.emoji}>
        🎬
      </Text>

      <Text style={screenStyles.title}>
        Movie Details
      </Text>

      <View style={screenStyles.card}>
        <Text style={screenStyles.label}>
          Movie ID
        </Text>

        <Text style={screenStyles.value}>
          {movieId}
        </Text>

        <Text style={screenStyles.label}>
          Movie Title
        </Text>

        <Text style={screenStyles.value}>
          {movieTitle}
        </Text>

        <Text style={screenStyles.label}>
          Genre
        </Text>

        <Text style={screenStyles.value}>
          {movie?.genre ?? 'Not available'}
        </Text>

        <Text style={screenStyles.label}>
          Release Year
        </Text>

        <Text style={screenStyles.value}>
          {movie?.year ?? 'Not available'}
        </Text>

        <Text style={screenStyles.label}>
          Watch Status
        </Text>

        <Text style={screenStyles.value}>
          {movie
            ? movie.watched
              ? 'Watched ✓'
              : 'To Watch'
            : 'Not available'}
        </Text>
      </View>

      {/* STACK NAVIGATION: GO BACK */}
      <TouchableOpacity
        style={screenStyles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={screenStyles.buttonText}>
          ← Go Back
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


// ==========================================
// 7. BOTTOM TAB NAVIGATOR
// ==========================================

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#E34B5F',
        tabBarInactiveTintColor: '#A5A5B5',
        tabBarStyle: {
          backgroundColor: '#1C1C27',
          borderTopColor: '#30303D',
        },
      }}
    >
      <Tab.Screen
        name="Watchlist"
        component={MovieWatchlistScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="list"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Movies"
        component={MoviesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="film"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


// ==========================================
// 8. DRAWER NAVIGATOR
// ==========================================

function DrawerNavigator() {
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
      }}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          title: 'MovieNight',
          drawerLabel: 'Home',
        }}
      />

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


// ==========================================
// 9. ROOT STACK NAVIGATOR
// ==========================================

function RootStackNavigator() {
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
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />

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


// ==========================================
// 10. MAIN APP
// ==========================================

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MovieProvider>
        <NavigationContainer>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#12121A"
          />

          <RootStackNavigator />
        </NavigationContainer>
      </MovieProvider>
    </GestureHandlerRootView>
  );
}


// ==========================================
// ORIGINAL WATCHLIST STYLES
// ==========================================

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

  // NEW: VIEW DETAILS BUTTON
  detailsButton: {
    backgroundColor: '#30243C',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 9,
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 16,
  },
  detailsButtonText: {
    color: '#E34B5F',
    fontSize: 13,
    fontWeight: 'bold',
  },
});


// ==========================================
// NEW SCREEN STYLES
// ==========================================

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12121A',
  },
  emoji: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 15,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    color: '#A5A5B5',
    fontSize: 14,
    lineHeight: 23,
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#1C1C27',
    padding: 22,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#30303D',
  },
  movieTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  highlight: {
    color: '#E34B5F',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  link: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#1C1C27',
    color: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#30303D',
    marginBottom: 20,
  },
  label: {
    color: '#A5A5B5',
    fontSize: 13,
    marginBottom: 6,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#E34B5F',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingsRow: {
    backgroundColor: '#1C1C27',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
});
