import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const MovieList = props => {
  const {movies, setMovies, results, searching} = props;
  const [displayed, setDisplayed] = useState(movies);

  const getMovies = () => {
    axios
      .get('http://localhost:5000/api/movies')
      .then(response => {
        console.log(response)
        setMovies(response.data)
        setDisplayed(response.data)
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  useEffect(() => {
    if (searching) {
      setDisplayed(results)
    } else {
      getMovies();
    }
  }, [results, searching]);
  
  return (
    <div className="movie-list">
    
      {(searching && !results.length) ? <p>No results.</p> : displayed.map(movie => (
        <Link to={`/movies/${movie.id}`} key={movie.id}>
          <MovieDetails movie={movie} />
        </Link>
      ))}
    </div>
  );
}

function MovieDetails({ movie }) {
  const { title, director, metascore, stars } = movie;
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div>
      <h3 className="movie-director">
      Director: <br/><em>{director}</em>
      </h3>
      <h3 className="movie-metascore">
      Metascore: <br/><strong>{metascore}</strong>
      </h3>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
    </div>
  );
}

export default MovieList;
