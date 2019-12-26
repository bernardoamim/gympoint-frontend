import React, { useState, useEffect } from 'react';
import { MdDone } from 'react-icons/md';
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
import { createInscriptionRequest } from '~/store/modules/inscription/actions';
import api from '~/services/api';

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

  const [studentsOptions, setStudentsOptions] = useState([]);
  const [plansOptions, setPlansOptions] = useState([]);
  const [plans, setPlans] = useState([]);
  const [plan_id, setPlanId] = useState(null);
  const [start_date, setStartDate] = useState(startOfToday());
  const [end_date, setEndDate] = useState(new Date());
  const [total, setTotal] = useState('');

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
    const plan = plans.find(p => p.id === plan_id);

    if (plan && start_date) {
      setEndDate(addMonths(start_date, plan.duration));
    }
  }, [plan_id, start_date]); //eslint-disable-line

  function handleSubmit(data, { resetForm }) {
    console.tron.log(data);
    dispatch(createInscriptionRequest(data));
    resetForm();
  }

  function handleGoBack() {
    history.push('/inscriptions');
  }

  function handleOptionChange(e) {
    if (e.target.name === 'plan_id') {
      const plan = plans.find(p => p.id === Number(e.target.value));
      setPlanId(Number(e.target.value));
      setTotal(formatPrice(plan.price * plan.duration));
    }
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
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
          <Select
            placeholder="Buscar aluno"
            name="student_id"
            options={studentsOptions}
          />
          <footer>
            <span>
              <p>PLANO</p>
              <Select
                name="plan_id"
                options={plansOptions}
                placeholder="Selecione o plano"
                onChange={e => handleOptionChange(e)}
              />
            </span>
            <span>
              <p>DATA DE INÍCIO</p>
              <DatePicker
                name="start_date"
                locale={pt}
                dateFormat="P"
                selected={start_date}
                onChange={date => setStartDate(date)}
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
