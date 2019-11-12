import React, { useState } from 'react';
import {Route, Link} from 'react-router-dom';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import Search from './Movies/Search';

const App = (props) => {
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
      <SavedList list={savedList} setSavedList={setSavedList} setQuery={setQuery} />
      {console.log(props.location, "location")}
      <Search 
        searchMovies={searchMovies}
        query={query}
        setQuery={setQuery}
        setSearching={setSearching}
      />
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
            addToSavedList={addToSavedList}
            searching={searching} />
        }>
      </Route>
    </div>
  );
};

export default App;
