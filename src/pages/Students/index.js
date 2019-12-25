import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateSubjectRequest } from '~/store/modules/subject/actions';
import { Container } from './styles';
import BackButton from '~/components/Buttons/BackButton';
import SubmitButton from '~/components/Buttons/SubmitButton';

export default function Students() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateSubjectRequest('student'));
  }, []); //eslint-disable-line

  return (
    <Container>
      <header>
        <BackButton />
        <SubmitButton>
          <span>Cadastrar</span>
        </SubmitButton>
      </header>
    </Container>
  );
}
