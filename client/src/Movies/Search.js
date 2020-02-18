import React from 'react'
import {Link} from 'react-router-dom'

function Search (props) {

    const {searchMovies, query, setQuery, setSearching} = props

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    return (
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
    )
}

export default Search