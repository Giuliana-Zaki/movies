import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

export default function TopRated({ addFavorite }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  async function fetchMovie(imdbID) {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=78447265&i=${imdbID}`
    );
    const data = await res.json();
    return data;
  }

  const topMovies = [
    'tt0111161',
    'tt0068646',
    'tt0468569',
    'tt0071562',
    'tt0050083',
    'tt0108052',
    'tt0167260',
    'tt0110912',
    'tt0060196',
    'tt0120737',
    'tt0137523',
    'tt0109830',
    'tt1375666',
    'tt0167261',
    'tt0080684',
    'tt0133093',
    'tt0099685',
    'tt0073486',
    'tt0047478',
    'tt0114369',
    'tt0317248',
    'tt0118799',
    'tt0038650',
    'tt0102926',
    'tt0076759',
    'tt0120815',
    'tt0245429',
    'tt0120689',
    'tt0816692',
    'tt6751668'
  ];

  useEffect(() => {
    async function fetchMovies() {
      const movieData = await Promise.all(topMovies.map(id => fetchMovie(id)));
      setMovies(movieData);
    }

    fetchMovies();
  }, []);

  const handlePosterClick = imdb => {
    navigate(`/movie/${imdb}`);
  };

  return (
    <List
      key={'TopRatedMovies'}
      sx={{
        pt: 10,
        width: '100%',
        bgcolor: 'background.paper'
      }}>
      {movies.map(movie => {
        return (
          <React.Fragment key={movie.imdbID}>
            <ListItem alignItems='flex-start' key={movie.imdbID}>
              <ListItemAvatar>
                <Avatar
                  alt={movie.Title}
                  src={movie.Poster}
                  onClick={() => handlePosterClick(movie.imdbID)}
                  style={{ cursor: 'pointer' }}
                />
              </ListItemAvatar>
              <ListItemText
                onClick={() => handlePosterClick(movie.imdbID)}
                style={{ cursor: 'pointer' }}
                primary={`${movie.Title} - ${movie.imdbRating}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      component='span'
                      variant='body2'
                      sx={{ color: 'text.primary', display: 'inline' }}>
                      {movie.Director} -
                    </Typography>
                    {movie.Plot}
                  </React.Fragment>
                }
              />
              <IconButton
                aria-label='add to favorites'
                onClick={() => addFavorite(movie)}>
                <FavoriteIcon />
              </IconButton>
            </ListItem>
            <Divider variant='inset' component='li' key={Divider} />
          </React.Fragment>
        );
      })}
    </List>
  );
}
