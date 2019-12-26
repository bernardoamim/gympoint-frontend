import React, { useEffect, useState } from 'react';
import { MdDone } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import api from '~/services/api';
import { Container } from './styles';
import history from '~/services/history';
import BackButton from '~/components/Buttons/BackButton';
import SubmitButton from '~/components/Buttons/SubmitButton';
import { updateSubjectRequest } from '~/store/modules/subject/actions';
import { updateStudentRequest } from '~/store/modules/student/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('*Insira o nome do aluno'),
  email: Yup.string()
    .email('*Insira um email válido')
    .required('*O email é obrigatório'),
  age: Yup.number()
    .typeError('*Insira uma idade válida')
    .positive('*Idade deve ser maior que zero')
    .required('*Campo obrigatório'),
  weight: Yup.number()
    .typeError('*Insira um peso válido')
    .positive('*Peso deve ser maior que zero')
    .required('*Campo obrigatório'),
  height: Yup.number()
    .typeError('*Insira uma altura válida')
    .positive('*Altura deve ser maior que zero')
    .required('*Campo obrigatório'),
});

export default function EditStudent({ match }) {
  const dispatch = useDispatch();
  const [student, setStudent] = useState({});

  async function loadStudent() {
    const { id } = match.params;

    const response = await api.get(`/students/${id}`);

    setStudent(response.data);
  }

  useEffect(() => {
    dispatch(updateSubjectRequest('student'));
    loadStudent();
  }, []); //eslint-disable-line

  function handleSubmit(data) {
    dispatch(updateStudentRequest(student.id, data));
  }

  function handleBack() {
    history.push('/students');
  }

  return (
    <Container>
      <Form schema={schema} initialData={student || {}} onSubmit={handleSubmit}>
        <header>
          <strong>Edição de aluno</strong>
          <aside>
            <BackButton clickFunc={handleBack} />
            <SubmitButton>
              <MdDone color="#fff" size={20} />
              <span>Salvar</span>
            </SubmitButton>
          </aside>
        </header>
        <div>
          <p>NOME COMPLETO</p>
          <Input name="name" type="text" placeholder="Seu nome completo" />
          <p>ENDEREÇO DE E-MAIL</p>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
          <footer>
            <div>
              <p>IDADE</p>
              <Input name="age" type="number" placeholder="" />
            </div>
            <div>
              <p>PESO (em Kg) </p>
              <Input name="weight" type="number" placeholder="" step="0.1" />
            </div>
            <div>
              <p>ALTURA</p>
              <Input name="height" type="number" placeholder="" step="0.01" />
            </div>
          </footer>
        </div>
      </Form>
    </Container>
  );
}

EditStudent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
