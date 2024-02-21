import React from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = ({query, handleSearch}) => {
  return (
    <>
      <TextField 
      id="outlined-basic" 
      label="Search for Products" 
      variant="outlined"
      type="search"
      value={query}
      onChange={handleSearch}/>
    </>
  )
}

export default SearchBar