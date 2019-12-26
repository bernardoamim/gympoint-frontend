import React, { useState, useEffect } from 'react';
import { MdDone } from 'react-icons/md';
import PropTypes from 'prop-types';
import { addMonths, startOfToday } from 'date-fns';
import pt from 'date-fns/locale/pt';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Input, Select } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import DatePicker from '~/components/DatePicker';
import { formatPrice } from '~/util/format';
import { Container } from './styles';
import history from '~/services/history';
import BackButton from '~/components/Buttons/BackButton';
import SubmitButton from '~/components/Buttons/SubmitButton';
import { updateSubjectRequest } from '~/store/modules/subject/actions';
import { updateInscriptionRequest } from '~/store/modules/inscription/actions';
import api from '~/services/api';

const schema = Yup.object().shape({
  plan_id: Yup.number()
    .typeError('*Selecione o plano')
    .required('*Campo obrigatório'),
  start_date: Yup.date()
    .typeError('*Selecione a data de início')
    .min(startOfToday(), '*Não são permitidas datas passadas'),
});

export default function EditInscription({ match }) {
  const dispatch = useDispatch();

  const [initialData, setInitialdata] = useState({});
  const [plansOptions, setPlansOptions] = useState([]);
  const [plans, setPlans] = useState([]);

  async function loadData() {
    const [plansData, inscriptionData] = await Promise.all([
      api.get('plans'),
      api.get(`inscriptions/${match.params.id}`),
    ]);

    setInitialdata({
      student: inscriptionData.data.student.name,
      plan_id: Number(inscriptionData.data.plan.id),
      start_date: new Date(inscriptionData.data.start_date),
      end_date: new Date(inscriptionData.data.end_date),
      total: formatPrice(inscriptionData.data.price),
    });

    setPlans(plansData.data);
    setPlansOptions(
      plansData.data.map(plan => ({
        id: plan.id,
        title: plan.title,
      }))
    );
  }

  useEffect(() => {
    dispatch(updateSubjectRequest('inscription'));

    loadData();
  }, []); //eslint-disable-line

  useEffect(() => {
    const plan = plans.find(p => p.id === initialData.plan_id);

    if (plan && initialData.start_date) {
      setInitialdata({
        ...initialData,
        end_date: addMonths(initialData.start_date, plan.duration),
        total: formatPrice(plan.price * plan.duration),
      });
    }
  }, [initialData.plan_id, initialData.start_date]); //eslint-disable-line

  function handleSubmit(data) {
    const { id } = match.params;
    dispatch(updateInscriptionRequest(id, data));
  }

  function handleGoBack() {
    history.push('/inscriptions');
  }

  return (
    <Container>
      {initialData && plansOptions && (
        <Form schema={schema} initialData={initialData} onSubmit={handleSubmit}>
          <header>
            <strong>Cadastro de matrícula</strong>
            <aside>
              <BackButton clickFunc={handleGoBack} />
              <SubmitButton type="submit">
                <MdDone color="#fff" size={20} />
                <span>Salvar</span>
              </SubmitButton>
            </aside>
          </header>
          <article>
            <p>ALUNO</p>
            <Input placeholder="Buscar aluno" name="student" disabled />
            <footer>
              <span>
                <p>PLANO</p>
                <Select
                  name="plan_id"
                  options={plansOptions}
                  value={initialData.plan_id}
                  placeholder="Selecione o plano"
                  onChange={e =>
                    setInitialdata({
                      ...initialData,
                      plan_id: Number(e.target.value),
                    })
                  }
                />
              </span>
              <span>
                <p>DATA DE INÍCIO</p>
                <DatePicker
                  name="start_date"
                  type="date"
                  locale={pt}
                  dateFormat="P"
                  selected={initialData.start_date}
                  onChange={date =>
                    setInitialdata({ ...initialData, start_date: date })
                  }
                />
              </span>
              <span>
                <p>DATA DE TÉRMINO</p>
                <DatePicker
                  name="end_date"
                  locale={pt}
                  dateFormat="P"
                  selected={initialData.end_date}
                  disabled
                />
              </span>
              <span>
                <p>PREÇO TOTAL</p>
                <Input
                  name="total"
                  value={initialData.total || 'R$ 0,00'}
                  type="text"
                  disabled
                />
              </span>
            </footer>
          </article>
        </Form>
      )}
    </Container>
  );
}

EditInscription.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
