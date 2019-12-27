import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function Table({ template, countRowns, columns, children }) {
  return <Container template={template}>{children}</Container>;
}

Table.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  template: PropTypes.string.isRequired,
  countRows: PropTypes.number,
  columns: PropTypes.number.isRequired,
};

Table.defaultProps = {
  countRows: 0,
};
