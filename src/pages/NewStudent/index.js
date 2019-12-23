import React, { useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Container } from './styles';
import BackButton from '~/components/Buttons/BackButton';
import SaveButton from '~/components/Buttons/SaveButton';
import { updateSubjectRequest } from '~/store/modules/subject/actions';
import * as StudentActions from '~/store/modules/student/actions';

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
    .typeError('*Insira uma peso válido')
    .positive('*Peso deve ser maior que zero')
    .required('*Campo obrigatório'),
  height: Yup.number()
    .typeError('*Insira uma altura válida')
    .positive('*Altura deve ser maior que zero')
    .required('*Campo obrigatório'),
});

export default function NewStudent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateSubjectRequest('student'));
  });

  function handleSubmit(data) {
    dispatch(StudentActions.createStudentRequest(data));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <header>
          <strong>Cadastro de aluno</strong>
          <aside>
            <BackButton />
            <SaveButton />
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
