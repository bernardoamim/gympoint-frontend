import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function Table({ template, countRowns, children }) {
  return <Container>{children}</Container>;
}

Table.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  template: PropTypes.string.isRequired,
  countRows: PropTypes.number,
};

Table.defaultProps = {
  countRows: 0,
};
