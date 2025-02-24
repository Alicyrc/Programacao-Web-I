import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import { searchMovies } from './services/tmdb';
import './App.css'

const App = () => {
  const [movies, setMovies] = useState([]);

  const handleSearch = async (query) => {
    if (!query) return; // Evita buscas vazias
    const results = await searchMovies(query);
    setMovies(results);
  };

  return (
    <Router>
      <div className='container'>
      <header className="header">
          <h1>Movies&Popcorn</h1>
          <div className='logo'></div>
        </header>
        <SearchBar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<MovieList movies={movies} />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;