import React from 'react';

const SearchBar = (props) => {
  return (
    <form>
      Search: <input type='text' name='searchStr' onChange={e => props.getEvents(e.target.value)}/>
    </form>
  )
}

export default SearchBar;