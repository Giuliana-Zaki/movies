import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TopRated from './components/TopRated';
import MovieDetails from './components/MovieDetails';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Root from './components/Root';
import Favorites from './components/Favorites';
import './index.css';
import Login from './components/Login';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');

  const addFavorite = movie => {
    setFavorites(oldFavorites => {
      const isAlreadyFavorite = oldFavorites.some(
        fav => fav.imdbID === movie.imdbID
      );

      if (isAlreadyFavorite) return oldFavorites;

      const updatedFavorites = [...oldFavorites, movie];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };
  const removeFavorite = movieID => {
    setFavorites(oldFavorites => {
      const updatedFavorites = oldFavorites.filter(
        fav => fav.imdbID !== movieID
      );
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };
  async function getMovie() {
    const data = await Promise.all(
      [1, 2, 3, 4, 5, 6].map(async page => {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=6fcd7099&s=movie&page=${page}`
        );
        return res.json();
      })
    );

    const ids = data.flatMap(pageData => pageData.Search.map(s => s.imdbID));
    const details = await Promise.all(
      ids.map(async id => {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=6fcd7099&i=${id}`
        );
        return response.json();
      })
    );

    setMovies(details);
  }
  useEffect(() => {
    getMovie();
  }, []);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleSearchChange = event => {
    const { name, value } = event.target;

    if (name === 'name') setName(value);
    if (name === 'year') setYear(value);
    if (name === 'genre') setGenre(value);

    event.preventDefault();
  };

  useEffect(() => {
    const lowerCaseName = name.toLowerCase();
    const lowerCaseGenre = genre.toLowerCase();

    const filtered = movies.filter(
      movie =>
        movie.Title.toLowerCase().includes(lowerCaseName) &&
        movie.Year.includes(year) &&
        movie.Genre.toLowerCase().includes(lowerCaseGenre)
    );

    setFilteredMovies(filtered);
  }, [name, year, genre, movies]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          index: true,
          element: (
            <Home
              movies={filteredMovies}
              favorites={favorites}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
              handleSearchChange={handleSearchChange}
              name={name}
              year={year}
              genre={genre}
            />
          )
        },
        {
          path: 'top rated',
          element: (
            <TopRated
              addFavorite={addFavorite}
              favorites={favorites}
              removeFavorite={removeFavorite}
            />
          )
        },
        {
          path: '/movie/:imdbID',
          element: <MovieDetails movies={movies} />
        },
        {
          path: '/favorites',
          element: (
            <Favorites favorites={favorites} removeFavorite={removeFavorite} />
          )
        },
        {
          path: '/login',
          element: <Login />
        }
      ]
    }
  ]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
