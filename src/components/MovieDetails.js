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
  console.log(movie, '11111');

  return (
    <React.Fragment>
      {movie ? (
        <Card sx={{ maxWidth: 500, mt: 11, ml: 40 }}>
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
              <Typography
                variant='body2'
                sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                <strong>Released:</strong> {movie.Released}
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                <strong>Genre:</strong> {movie.Genre}
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                <strong>Plot:</strong> {movie.Plot}
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                <strong>Plot:</strong>
                {movie.Plot}
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                <strong>Awards:</strong> {movie.Awards}
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
