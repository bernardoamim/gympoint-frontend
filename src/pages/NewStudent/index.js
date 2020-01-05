import React, { useEffect, useState } from 'react';
import { MdDone } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { Container } from './styles';
import history from '~/services/history';
import MaskedInput from '~/components/MaskedInput';
import BackButton from '~/components/Buttons/BackButton';
import SubmitButton from '~/components/Buttons/SubmitButton';
import { updateSubjectRequest } from '~/store/modules/subject/actions';

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

export default function NewStudent() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [student, setStudent] = useState({
    age: '',
    weight: '',
    height: '',
  });

  useEffect(() => {
    dispatch(updateSubjectRequest('student'));
  }, []); //eslint-disable-line

  async function handleSubmit(data) {
    setLoading(true);

    try {
      await api.post('/students', data);

      setLoading(false);
      toast.success('Aluno cadastrado com sucesso.');
    } catch (err) {
      setLoading(false);

      if (err.response && err.response.data) {
        toast.error(err.response.data.error);
      } else {
        toast.error('Erro ao cadastrar aluno.');
      }
    }
  }

  function handleBack() {
    history.push('/home');
  }

  return (
    <Container>
      <Form schema={schema} initialData={student} onSubmit={handleSubmit}>
        <header>
          <strong>Cadastro de aluno</strong>
          <aside>
            <BackButton clickFunc={handleBack} />
            <SubmitButton loading={loading}>
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
              <Input name="age" type="number" placeholder="Sua idade" />
            </div>
            <div>
              <p>PESO (em Kg) </p>
              <MaskedInput
                name="weight"
                type="text"
                mask="999.9"
                onChange={value =>
                  setStudent({
                    ...student,
                    weight: Number(value.substring(0, 5)),
                  })
                }
                placeholder="000.0kg"
              />
            </div>
            <div>
              <p>ALTURA</p>
              <MaskedInput
                name="height"
                type="text"
                mask="9.99"
                onChange={value =>
                  setStudent({
                    ...student,
                    height: Number(value.substring(0, 4)),
                  })
                }
                placeholder="0.00m"
              />
            </div>
          </footer>
        </div>
      </Form>
    </Container>
  );
}
