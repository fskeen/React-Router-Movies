import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Movie = (props) => {
  const [movie, setMovie] = useState();
  const {searching} = props;

  useEffect(() => {
    const id = props.match.params.id;
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook
       axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(response => {
          setMovie(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    // if (searching) {
    //   props.history.push("/")
    // }
  },[props.match.params.id]);
  
  // Uncomment this only when you have moved on to the stretch goals
  const saveMovie = () => {
    const addToSavedList = props.addToSavedList;
    const saved = props.savedList.filter(saved => saved.id === movie.id)
    if (saved.length === 0) {
      addToSavedList(movie)
    } else {
      return
    }
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;
  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div>
        <div className="movie-director">
        Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
        </div>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
        <button onClick={saveMovie} className="save-button">Save</button>
      </div>
    </div>
  );
}

export default Movie;
