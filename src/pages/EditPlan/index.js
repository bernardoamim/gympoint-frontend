import React, { useState, useEffect, useMemo } from 'react';
import { MdDone } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { formatPrice } from '~/util/format';
import api from '~/services/api';
import { Container } from './styles';
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

export default function EditPlan({ match }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState({});
  const [total, setTotal] = useState(0);

  async function loadPlan() {
    const { id } = match.params;

    const response = await api.get(`/plans/${id}`);

    setPlan(response.data);
  }

  useEffect(() => {
    dispatch(updateSubjectRequest('plan'));
    loadPlan();
  }, []); //eslint-disable-line

  async function handleSubmit(data) {
    setLoading(true);

    try {
      await api.put(`/plans/${plan.id}`, data);

      setLoading(false);
      toast.success('Dados salvos com sucesso.');
    } catch (err) {
      setLoading(false);

      if (err.response && err.response.data) {
        toast.error(err.response.data.error);
      } else {
        toast.error('Erro ao alterar plano.');
      }
    }
  }

  function handleBack() {
    history.push('/plans');
  }

  useMemo(() => {
    if (plan.price && plan.duration) {
      setTotal(formatPrice(plan.price * plan.duration));
    }
  }, [plan.price, plan.duration]);

  return (
    <Container>
      <Form schema={schema} initialData={plan || {}} onSubmit={handleSubmit}>
        <header>
          <strong>Edição de plano</strong>
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
          <Input name="title" type="text" placeholder="" />
          <footer>
            <div>
              <p>DURAÇÃO (em meses)</p>
              <Input
                name="duration"
                onChange={e => setPlan({ ...plan, duration: e.target.value })}
                type="number"
                placeholder=""
              />
            </div>
            <div>
              <p>PREÇO MENSAL </p>
              <Input
                name="price"
                onChange={e => setPlan({ ...plan, price: e.target.value })}
                type="text"
              />
            </div>
            <div>
              <p>PREÇO TOTAL</p>
              <Input
                name="total"
                value={total || 'R$ 0,00'}
                type="text"
                readOnly
                disabled
              />
            </div>
          </footer>
        </div>
      </Form>
    </Container>
  );
}

EditPlan.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
