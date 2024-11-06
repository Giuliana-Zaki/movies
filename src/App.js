// index.js or App.js
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

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    name: '',
    year: '',
    genre: ''
  });
  const filteredMovies =
    searchQuery.name || searchQuery.year || searchQuery.genre
      ? movies.filter(
          movie =>
            movie.Title.toLowerCase().includes(
              searchQuery.name.toLowerCase()
            ) &&
            movie.Year.toLowerCase().includes(searchQuery.year.toLowerCase()) &&
            movie.Genre.toLowerCase().includes(searchQuery.genre.toLowerCase())
        )
      : movies;
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

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);
  console.log(favorites);

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
              addFavorite={addFavorite}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )
        },
        {
          path: 'top rated',
          element: <TopRated addFavorite={addFavorite} />
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
