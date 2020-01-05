import React, { useState, useEffect, useMemo } from 'react';
import { MdDone } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { Container } from './styles';
import { formatPrice } from '~/util/format';
import history from '~/services/history';
import BackButton from '~/components/Buttons/BackButton';
import SubmitButton from '~/components/Buttons/SubmitButton';
import { updateSubjectRequest } from '~/store/modules/subject/actions';

const schema = Yup.object().shape({
  title: Yup.string().required('*Insira o nome do plano'),
  duration: Yup.number()
    .typeError('*Insira uma duração válida')
    .positive('*Duração deve ser maior que zero')
    .required('*Campo obrigatório'),
  price: Yup.number()
    .typeError('*Insira um preço válido')
    .positive('*Preço deve ser maior que zero')
    .required('*Campo obrigatório'),
});

export default function NewPlan() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(updateSubjectRequest('plan'));
  }, []); //eslint-disable-line

  async function handleSubmit(data, { resetForm }) {
    setLoading(true);

    try {
      await api.post('/plans', data);

      setLoading(false);
      toast.success('Plano cadastrado com sucesso.');
      resetForm();
    } catch (err) {
      setLoading(false);
      resetForm();

      if (err.response && err.response.data) {
        toast.error(err.response.data.error);
      } else {
        toast.error('Erro ao cadastrar plano.');
      }
    }
  }

  function handleBack() {
    history.push('/plans');
  }

  useMemo(() => {
    setTotal(formatPrice(price * duration));
  }, [price, duration]);

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <header>
          <strong>Cadastro de plano</strong>
          <aside>
            <BackButton clickFunc={handleBack} />
            <SubmitButton loading={loading}>
              <MdDone color="#fff" size={20} />
              <span>Salvar</span>
            </SubmitButton>
          </aside>
        </header>
        <div>
          <p>TÍTULO DO PLANO</p>
          <Input name="title" type="text" placeholder="Título do plano" />
          <footer>
            <div>
              <p>DURAÇÃO (em meses)</p>
              <Input
                name="duration"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                type="number"
                placeholder="0"
              />
            </div>
            <div>
              <p>PREÇO MENSAL </p>
              <Input
                name="price"
                value={price}
                onChange={e => setPrice(e.target.value)}
                type="number"
                placeholder="R$ 0,00"
                step="0.01"
              />
            </div>
            <div>
              <p>PREÇO TOTAL</p>
              <Input
                name="total"
                value={total || 'R$ 0,00'}
                type="text"
                disabled
                readOnly
              />
            </div>
          </footer>
        </div>
      </Form>
    </Container>
  );
}
