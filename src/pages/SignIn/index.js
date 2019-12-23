import React from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import leftdb from '~/assets/Dumbbell@3x/leftDb@3x.png';
import rightdb from '~/assets/Dumbbell@3x/rightDb@3x.png';
import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('*O email é obrigatório'),
  password: Yup.string().required('*A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    console.tron.log(email, password);
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <div>
        <img src={leftdb} leftDb alt="" />
        <img src={rightdb} alt="" />
      </div>
      <strong>GYMPOINT</strong>
      <Form schema={schema} onSubmit={handleSubmit}>
        <p>SEU E-MAIL</p>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <p>SUA SENHA</p>
        <Input name="password" type="password" placeholder="************" />
        <button type="submit">
          <span>{loading ? 'Carregando...' : 'Entrar no sistema'}</span>
        </button>
      </Form>
    </>
  );
}
