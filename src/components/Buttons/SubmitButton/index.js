import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './styles';

export default function SubmitButton({ loading, children }) {
  return (
    <Button loading={loading} type="submit">
      {loading ? <span>Salvando</span> : children}
    </Button>
  );
}

SubmitButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
  loading: PropTypes.bool,
};

SubmitButton.defaultProps = {
  loading: false,
};
