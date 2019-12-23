import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSubjectRequest } from '~/store/modules/subject/actions';
import { Container } from './styles';
import BackButton from '~/components/Buttons/BackButton';
import SaveButton from '~/components/Buttons/SaveButton';

export default function Students() {
  const dispatch = useDispatch();
  const subject = useSelector(state => state.subject.subject);
  console.tron.log(subject);
  useEffect(() => {
    async function updateSubject() {
      dispatch(updateSubjectRequest('student'));
    }
    updateSubject();
  });

  return (
    <Container>
      <header>
        <BackButton />
        <SaveButton />
      </header>
    </Container>
  );
}
