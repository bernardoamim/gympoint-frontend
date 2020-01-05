import React, { useState, useEffect } from 'react';
import { MdDone } from 'react-icons/md';
import { addMonths, startOfToday, startOfDay } from 'date-fns';
import pt from 'date-fns/locale/pt';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
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
// import { createInscriptionRequest } from '~/store/modules/inscription/actions';

const schema = Yup.object().shape({
  student_id: Yup.number()
    .typeError('*Selecione o aluno')
    .required('*Selecione o aluno'),
  plan_id: Yup.number()
    .typeError('*Selecione o plano')
    .required('*Campo obrigatório'),
  start_date: Yup.date()
    .typeError('*Selecione a data de início')
    .min(startOfToday(), '*Não são permitidas datas passadas')
    .required('*Campo obrigatório'),
});

export default function NewInscription() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [studentsOptions, setStudentsOptions] = useState([]);
  const [plansOptions, setPlansOptions] = useState([]);
  const [plans, setPlans] = useState([]);
  const [end_date, setEndDate] = useState(startOfToday());
  const [total, setTotal] = useState('');
  const [inscription, setInscription] = useState({
    student_id: null,
    plan_id: null,
    start_date: startOfToday(),
  });

  useEffect(() => {
    dispatch(updateSubjectRequest('inscription'));

    async function loadData() {
      const [studentsData, plansData] = await Promise.all([
        api.get('students'),
        api.get('plans'),
      ]);

      setStudentsOptions(
        studentsData.data.map(student => ({
          id: student.id,
          title: student.name,
        }))
      );
      setPlans(plansData.data);
      setPlansOptions(
        plansData.data.map(plan => ({
          id: plan.id,
          title: plan.title,
        }))
      );
    }

    loadData();
  }, []); //eslint-disable-line

  useEffect(() => {
    const plan = plans.find(p => p.id === inscription.plan_id);

    if (plan) {
      setEndDate(addMonths(inscription.start_date, plan.duration));
    }
  }, [inscription.plan_id, inscription.start_date]); //eslint-disable-line

  async function handleSubmit(data) {
    setLoading(true);

    try {
      await api.post('/inscriptions', data);

      setLoading(false);
      toast.success('Matrícula cadastrada com sucesso.');
    } catch (err) {
      setLoading(false);

      if (err.response && err.response.data) {
        toast.error(err.response.data.error);
      } else {
        toast.error('Erro ao cadastrar matrícula.');
      }
    }
  }

  function handleGoBack() {
    history.push('/inscriptions');
  }

  function handleOptionChange(option, name) {
    if (!option || !name) return;

    if (name === 'plan_id') {
      const plan = plans.find(p => p.id === Number(option.id));
      setInscription({ ...inscription, plan_id: Number(option.id) });
      setTotal(formatPrice(plan.price * plan.duration));
    }

    if (name === 'student_id') {
      setInscription({ ...inscription, student_id: option.id });
    }
  }

  async function filterStudents(inputValue) {
    const { data } = await api.get('students', {
      params: {
        q: inputValue,
      },
    });

    return data.map(student => ({ id: student.id, title: student.name }));
  }

  async function filterPlans(inputValue) {
    return plansOptions.filter(i =>
      i.title.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <header>
          <strong>Cadastro de matrícula</strong>
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
          <ReactSelect
            placeholder="Buscar aluno"
            name="student_id"
            initialOptions={studentsOptions}
            loadOptions={filterStudents}
            onChange={handleOptionChange}
          />
          <footer>
            <span>
              <p>PLANO</p>
              <ReactSelect
                placeholder="Selecione o plano"
                initialOptions={plansOptions}
                loadOptions={filterPlans}
                name="plan_id"
                onChange={handleOptionChange}
              />
            </span>
            <span>
              <p>DATA DE INÍCIO</p>
              <DatePicker
                name="start_date"
                locale={pt}
                dateFormat="P"
                selected={inscription.start_date}
                onChange={date =>
                  setInscription({
                    ...inscription,
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
                selected={end_date}
                disabled
              />
            </span>
            <span>
              <p>PREÇO TOTAL</p>
              <Input
                name="total"
                value={total || 'R$ 0,00'}
                type="text"
                disabled
              />
            </span>
          </footer>
        </article>
      </Form>
    </Container>
  );
}
