import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Bar } from './styles';

export default function SearchBar() {
  return (
    <Bar>
      <MdSearch size={16} color="#999" />
      <input type="text" placeholder="Buscar aluno" />
    </Bar>
  );
}
