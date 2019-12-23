import React from 'react';
import { MdDone } from 'react-icons/md';
import { PrimaryButton } from '../styles';

export default function SaveButton() {
  return (
    <PrimaryButton>
      <MdDone size={20} color="#fff" />
      <span>Salvar</span>
    </PrimaryButton>
  );
}
