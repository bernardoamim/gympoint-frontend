import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import { Bar } from './styles';

export default function SearchBar({ handleChange }) {
  return (
    <Bar>
      <MdSearch size={16} color="#999" />
      <input type="text" placeholder="Buscar aluno" onChange={handleChange} />
    </Bar>
  );
}

SearchBar.propTypes = {
  handleChange: PropTypes.func,
};

SearchBar.defaultProps = {
  handleChange() {},
};
