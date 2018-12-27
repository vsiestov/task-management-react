import React from 'react';
import PropTypes from 'prop-types';

const Search = (props) => {
  return (
    <div className="tasks__search">
      <input type="search" className="input" placeholder="Filter tasks" onChange={(event) => {
        props.onInput(event.target.value);
      }} />
    </div>
  );
};

Search.propTypes = {
  onInput: PropTypes.func.isRequired
};

export default Search;
