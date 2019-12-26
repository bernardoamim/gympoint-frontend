import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './styles';

export default function SubmitButton({ children }) {
  return <Button type="submit">{children}</Button>;
}

SubmitButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
};
