import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Button } from './styles';

export default function BackButton({ clickFunc }) {
  return (
    <Button onClick={clickFunc}>
      <MdKeyboardArrowLeft size={20} color="#fff" />
      <span>Voltar</span>
    </Button>
  );
}

BackButton.propTypes = {
  clickFunc: PropTypes.func,
};

BackButton.defaultProps = {
  clickFunc() {},
};
