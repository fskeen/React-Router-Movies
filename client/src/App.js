import React, { useState } from 'react';
import {Route} from 'react-router-dom';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

const App = () => {
  const [savedList, setSavedList] = useState( [] );
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([])
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)

  const addToSavedList = movie => {
    setSavedList( [...savedList, movie] );
  };

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const searchMovies = (e) => {
    e.preventDefault()
    const queryItem = query.toLocaleLowerCase().trim()
    const films = movies.filter(film => {
      if (film.title.toLowerCase().includes(queryItem)) {
        return film
      } else if (film.director.toLowerCase().includes(queryItem)) {
        return film
      } else if (film.stars.find(star => star.toLowerCase().includes(queryItem))) {
        return film
      } else {
        return ""
      }
    })

    if (query) {
      setSearching(true)
      return setResults(films)
    }
  }

  return (
    <div>
    <SavedList list={savedList} setSavedList={setSavedList} />
      <form onSubmit={searchMovies}>
        <label htmlFor="search">Search for a movie</label>
        <input
          type="text"
          name="search"
          id="search"
          value={query}
          onChange={handleChange}>
        </input>
        <button type="submit">Search</button>
        
        {query.length > 0 ? 
          <button 
          onClick={() => {
            setQuery("")
            setSearching(false)
          }}>Clear search</button> : ""
        }
      </form>


      <Route
        exact
        path="/"
        render={props => 
          <MovieList 
            {...props} 
            results={results} 
            query={query}
            searching={searching}
            movies={movies}
            setMovies={setMovies}/>
        }>
      </Route>
      <Route
        path="/movies/:id"
        render={props => 
          <Movie
            {...props} 
            savedList={savedList} 
            addToSavedList={addToSavedList} />
        }>
      </Route>
    </div>
  );
};

export default App;
