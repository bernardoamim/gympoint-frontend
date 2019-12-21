import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import leftDb from '~/assets/Dumbbell@3x/leftDb@3x.png';
import rightDb from '~/assets/Dumbbell@3x/rightDb@3x.png';

export default function SignIn() {
  return (
    <>
      <div>
        <img src={leftDb} leftDb alt="" />
        <img src={rightDb} alt="" />
      </div>
      <strong>GYMPOINT</strong>
      <Form>
        <p>SEU E-MAIL</p>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <p>SUA SENHA</p>
        <Input name="password" type="password" placeholder="************" />
        <button type="submit">
          <span>Entrar no sistema</span>
        </button>
      </Form>
    </>
  );
}
