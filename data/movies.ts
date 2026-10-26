
export type Movie = {
  id: string;
  title: string;
  genre: string;
  year: number;
  watched: boolean;
};

export const dummyMovies: Movie[] = [
  {
    id: '1',
    title: 'Inception',
    genre: 'Sci-Fi',
    year: 2010,
    watched: false,
  },
  {
    id: '2',
    title: 'Interstellar',
    genre: 'Sci-Fi',
    year: 2014,
    watched: false,
  },
  {
    id: '3',
    title: 'The Dark Knight',
    genre: 'Action',
    year: 2008,
    watched: true,
  },
  {
    id: '4',
    title: 'Spirited Away',
    genre: 'Animation',
    year: 2001,
    watched: false,
  },
  {
    id: '5',
    title: 'The Shawshank Redemption',
    genre: 'Drama',
    year: 1994,
    watched: true,
  },
];
