import React, { useState, useEffect } from 'react';
import { MdDone } from 'react-icons/md';
import PropTypes from 'prop-types';
import { addMonths, startOfToday, startOfDay } from 'date-fns';
import pt from 'date-fns/locale/pt';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import api from '~/services/api';
import ReactSelect from '~/components/ReactSelect';
import DatePicker from '~/components/DatePicker';
import { formatPrice } from '~/util/format';
import { Container } from './styles';
import history from '~/services/history';
import BackButton from '~/components/Buttons/BackButton';
import SubmitButton from '~/components/Buttons/SubmitButton';
import { updateSubjectRequest } from '~/store/modules/subject/actions';

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
  const [loading, setLoading] = useState(false);

  const [initialData, setInitialdata] = useState({});
  const [plansOptions, setPlansOptions] = useState([]);
  const [plans, setPlans] = useState([]);
  const [total, setTotal] = useState('');
  const [definedPlan, setDefinedPlan] = useState(null);

  async function loadData() {
    const [plansData, inscriptionData] = await Promise.all([
      api.get('plans'),
      api.get(`inscriptions/${match.params.id}`),
    ]);

    const { student, plan, start_date, end_date, price } = inscriptionData.data;

    setInitialdata({
      student: student.name,
      plan_id: Number(plan.id),
      start_date: new Date(start_date),
      end_date: new Date(end_date),
    });

    setTotal(price ? formatPrice(price) : 'R$ 0,00');
    setDefinedPlan({ id: plan.id, title: plan.title });

    setPlans(plansData.data);
    setPlansOptions(
      plansData.data.map(p => ({
        id: p.id,
        title: p.title,
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
      });

      setTotal(formatPrice(plan.price * plan.duration));
    }
  }, [initialData.plan_id, initialData.start_date]); //eslint-disable-line

  async function handleSubmit(data) {
    const { id } = match.params;
    setLoading(true);

    try {
      await api.put(`/inscriptions/${id}`, data);

      setLoading(false);
      toast.success('Matrícula alterada com sucesso.');
    } catch (err) {
      setLoading(false);

      if (err.response && err.response.data) {
        toast.error(err.response.data.error);
      } else {
        toast.error('Erro ao alterar matrícula.');
      }
    }
  }

  function handleGoBack() {
    history.push('/inscriptions');
  }

  async function filterPlans(inputValue) {
    return plansOptions.filter(i =>
      i.title.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  return (
    <Container>
      {initialData && plansOptions && definedPlan && (
        <Form schema={schema} initialData={initialData} onSubmit={handleSubmit}>
          <header>
            <strong>Edição de matrícula</strong>
            <aside>
              <BackButton clickFunc={handleGoBack} />
              <SubmitButton loading={loading}>
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
                <ReactSelect
                  placeholder="Selecione o plano"
                  initialOptions={plansOptions}
                  loadOptions={filterPlans}
                  defaultValue={definedPlan}
                  definedPlan={definedPlan}
                  name="plan_id"
                  onChange={option =>
                    setInitialdata({ ...initialData, plan_id: option.id })
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
                    setInitialdata({
                      ...initialData,
                      start_date: startOfDay(date),
                    })
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
                  placeholder={`${initialData.total}`}
                  value={total}
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
