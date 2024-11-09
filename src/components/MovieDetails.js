import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function MovieDetails({ movies }) {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);

  async function getMovie() {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=78447265&i=${imdbID}`
    );
    const data = await res.json();
    setMovie(data);
  }

  useEffect(() => {
    const selectedMovie = movies.find(m => m.imdbID === imdbID);
    if (selectedMovie) {
      setMovie(selectedMovie);
    } else {
      getMovie();
    }
  }, [imdbID, movies]);

  return (
    <React.Fragment>
      {movie ? (
        <Card sx={{ maxWidth: 500, mt: 10, ml: 40 }}>
          <CardActionArea>
            <CardMedia
              component='img'
              height='auto'
              image={movie.Poster}
              alt={movie.Title}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {movie.Title} by {movie.Director}
              </Typography>
              <Typography variant='subtitle2' gutterBottom>
                Released
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {movie.Released}
              </Typography>
              <Typography variant='subtitle2' gutterBottom>
                Genre
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {movie.Genre}
              </Typography>
              <Typography variant='subtitle2' gutterBottom>
                Plot
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {movie.Plot}
              </Typography>
              <Typography variant='subtitle2' gutterBottom>
                Awards
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {movie.Awards}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </React.Fragment>
  );
}
