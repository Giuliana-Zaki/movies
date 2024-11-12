import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
export default function Favorites({ favorites, removeFavorite }) {
  console.log(favorites);
  const ExpandMore = styled(props => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    variants: [
      {
        props: ({ expand }) => !expand,
        style: {
          transform: 'rotate(0deg)'
        }
      },
      {
        props: ({ expand }) => !!expand,
        style: {
          transform: 'rotate(180deg)'
        }
      }
    ]
  }));
  const navigate = useNavigate();

  const handlePosterClick = imdbID => {
    navigate(`/movie/${imdbID}`);
  };

  const [expanded, setExpanded] = useState({});

  const handleExpandClick = imdbID => {
    setExpanded(expand => ({ ...expand, [imdbID]: !expand[imdbID] }));
  };

  return (
    <Box sx={{ pt: 13 }}>
      <Typography variant='h1' gutterBottom>
        Favorites
      </Typography>
      <ImageList variant='masonry' cols={3} gap={8}>
        {favorites.map(movie => (
          <ImageListItem key={movie.imdbID}>
            <Card
              sx={{
                maxWidth: 345,
                marginBottom: '30px',
                maxHeight: 'auto'
              }}>
              <CardHeader title={movie.Title} subheader={movie.Director} />
              <CardMedia
                component='img'
                height='auto'
                image={movie.Poster}
                alt={movie.Title}
                onClick={() => handlePosterClick(movie.imdbID)}
                style={{ cursor: 'pointer' }}
              />
              <CardActions disableSpacing>
                <IconButton
                  aria-label='remove from favorites'
                  onClick={() => removeFavorite(movie.imdbID)}>
                  <FavoriteIcon />
                </IconButton>
                <ExpandMore
                  expand={expanded[movie.imdbID] || false}
                  onClick={() => handleExpandClick(movie.imdbID)}
                  aria-expanded={expanded[movie.imdbID] || false}
                  aria-label='show more'>
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse
                in={expanded[movie.imdbID] || false}
                timeout='auto'
                unmountOnExit>
                <CardContent>
                  <Typography sx={{ marginBottom: 2 }}>{movie.Plot}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
