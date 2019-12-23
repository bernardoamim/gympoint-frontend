import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { SecondaryButton } from '../styles';

export default function BackButton() {
  return (
    <SecondaryButton>
      <MdKeyboardArrowLeft size={20} color="#fff" />
      <span>Voltar</span>
    </SecondaryButton>
  );
}
