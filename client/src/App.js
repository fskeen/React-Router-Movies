import React, { useState } from 'react';
import {Route} from 'react-router-dom';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

const App = () => {
  const [savedList, setSavedList] = useState( [] );

  const addToSavedList = movie => {
    setSavedList( [...savedList, movie] );
  };

  return (
    <div>
      <SavedList list={savedList} setSavedList={setSavedList} />
      <Route exact path="/" component={MovieList}></Route>
      <Route path="/movies/:id" render={props => <Movie {...props} savedList={savedList} addToSavedList={addToSavedList} />}></Route>
    </div>
  );
};

export default App;
