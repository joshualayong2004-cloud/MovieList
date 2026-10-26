
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import { dummyMovies, type Movie } from '../data/movies';

type MovieContextType = {
  movies: Movie[];
  loading: boolean;
  addMovie: (
    title: string,
    genre: string,
    year: number
  ) => void;
  toggleWatched: (id: string) => void;
};

const MovieContext = createContext<
  MovieContextType | undefined
>(undefined);

// Simulate an API request using local dummy data.
function fetchMovies(): Promise<Movie[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyMovies);
    }, 1000);
  });
}

export function MovieProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect: load the sample movies when the provider mounts.
  useEffect(() => {
    let active = true;

    fetchMovies()
      .then((data) => {
        if (active) {
          setMovies(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setMovies([]);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  // Add a movie without a rating field.
  const addMovie = (
    title: string,
    genre: string,
    year: number
  ) => {
    const newMovie: Movie = {
      id: `${Date.now()}-${Math.random()}`,
      title: title.trim(),
      genre,
      year,
      watched: false,
    };

    setMovies((currentMovies) => [
      newMovie,
      ...currentMovies,
    ]);
  };

  // Toggle a movie between watched and unwatched.
  const toggleWatched = (id: string) => {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === id
          ? { ...movie, watched: !movie.watched }
          : movie
      )
    );
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        loading,
        addMovie,
        toggleWatched,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

// useContext: access shared movie data and actions.
export function useMovies() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error(
      'useMovies must be used inside MovieProvider'
    );
  }

  return context;
}
