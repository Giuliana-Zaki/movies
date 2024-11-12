import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
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
import Toolbar from '@mui/material/Toolbar';
import Pagination from '@mui/material/Pagination';
import { Stack } from '@mui/material';

export default function Home({
  movies,
  addFavorite,
  favorites,
  removeFavorite
}) {
  const [expanded, setExpanded] = useState({});
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [page, setPage] = useState(1);
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const navigate = useNavigate();
  const nameInputRef = useRef();
  const yearInputRef = useRef();
  const genreInputRef = useRef();

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

  const handleSearchChange = event => {
    const { name, value } = event.target;

    if (name === 'name') {
      setName(value);
      nameInputRef.current.focus();
    } else if (name === 'year') {
      setYear(value);
      yearInputRef.current.focus();
    } else if (name === 'genre') {
      setGenre(value);
      genreInputRef.current.focus();
    }
    event.preventDefault();
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePosterClick = imdbID => {
    navigate(`/movie/${imdbID}`);
  };

  const handleExpandClick = imdbID => {
    setExpanded(expand => ({ ...expand, [imdbID]: !expand[imdbID] }));
  };
  const isFavorited = movie =>
    favorites.some(fav => fav.imdbID === movie.imdbID);

  const handleFavoriteClick = movie => {
    if (isFavorited(movie)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch'
        }
      }
    }
  }));

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
  const MOVIES_PER_PAGE = 12;
  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  const displayedMovies = filteredMovies.slice(
    startIndex,
    startIndex + MOVIES_PER_PAGE
  );

  return (
    <Box sx={{ pt: 10 }} onChange={e => e.preventDefault()}>
      <Toolbar disableGutters>
        <Typography variant='h1' gutterBottom>
          Movie Mania
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              name='name'
              placeholder='Name'
              inputProps={{ 'aria-label': 'name' }}
              inputRef={nameInputRef}
              value={name}
              onChange={handleSearchChange}
            />
          </Search>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              name='year'
              placeholder='Year'
              inputRef={yearInputRef}
              inputProps={{ 'aria-label': 'year' }}
              value={year}
              onChange={handleSearchChange}
            />
          </Search>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              name='genre'
              placeholder='Genre'
              inputRef={genreInputRef}
              inputProps={{ 'aria-label': 'genre' }}
              value={genre}
              onChange={handleSearchChange}
            />
          </Search>
        </Box>
      </Toolbar>
      <ImageList variant='masonry' cols={3} gap={8}>
        {displayedMovies.map(movie => (
          <ImageListItem key={movie.imdbID}>
            <Card
              sx={{
                maxWidth: 345,
                marginBottom: '30px',
                maxHeight: 'auto'
              }}>
              <CardHeader title={movie.Title} subheader={movie.Director} />
              <CardMedia
                sx={{ maxHeight: '500px' }}
                component='img'
                image={movie.Poster}
                alt={movie.Title}
                onClick={() => handlePosterClick(movie.imdbID)}
                style={{ cursor: 'pointer' }}
              />
              <CardActions disableSpacing>
                <IconButton
                  aria-label='add to favorites'
                  onClick={() => handleFavoriteClick(movie)}>
                  <FavoriteIcon
                    sx={{ color: isFavorited(movie) ? 'red' : 'gray' }}
                  />
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
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(filteredMovies.length / MOVIES_PER_PAGE)}
            page={page}
            onChange={handlePageChange}
          />
        </Stack>
      </ImageList>
    </Box>
  );
}
