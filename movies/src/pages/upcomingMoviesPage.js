import React, { useState, useEffect } from "react";
import { getUpcomingMovie } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage'
import AddToFavorites from "../components/cardIcons/addToFavorites";
import AddToPlaylist from "../components/cardIcons/addToWatchList";
const UpcomingMoviePage = (props) => {
  const [movies, setMovies] = useState([]);
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  const addToFavorites = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, favorite: true } : m
    );
    setMovies(updatedMovies);
  };

  useEffect(() => {
    getUpcomingMovie().then(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <PageTemplate
        title="Upcoming Movies"
        movies={movies}
        action={(movie) => {
            return (
                <>
                    <AddToFavorites movie={movie}/>
                    <AddToPlaylist movie={movie}/>
                </>
            );
        }}
    />
);
};
export default UpcomingMoviePage;