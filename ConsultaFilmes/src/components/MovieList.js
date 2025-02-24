import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
  return (
    <ul className='movie-list'>
      {movies.map((movie) => (
        <li key={movie.id} className="border p-2 mb-2 rounded">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="no-poster">No poster available</div>
            )}
          <h2 className="font-bold">{movie.title}</h2>
          <p>{movie.release_date}</p>
          <p>{movie.overview}</p>
          <Link to={`/movie/${movie.id}`} className="text-blue-500">Ver Detalhes</Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;