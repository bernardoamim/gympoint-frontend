import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import history from '~/services/history';
import { Container } from './styles';
import { Button } from '~/components/Buttons/SubmitButton/styles';
import Table from '~/components/Table';

import Pagination from '~/components/Pagination';
import api from '~/services/api';
import { updateSubjectRequest } from '~/store/modules/subject/actions';
import { formatPrice } from '~/util/format';

export default function Plans() {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  async function loadPlans(page = 1) {
    const response = await api.get('plans', {
      params: {
        page,
      },
    });

    setCurrentPage(page);
    setPlans(
      response.data.map(plan => ({
        ...plan,
        price: formatPrice(plan.price),
        duration:
          plan.duration === 1
            ? `${plan.duration} mês`
            : `${plan.duration} meses`,
      }))
    );
  }

  useEffect(() => {
    dispatch(updateSubjectRequest('plan'));
    loadPlans();
  }, []); //eslint-disable-line

  function handleEdit(id) {
    history.push(`/editPlan/${id}`);
  }

  async function handleDelete(plan) {
    // eslint-disable-next-line no-alert
    const ans = window.confirm(
      `Tem certeza que deseja deletar o plano ${plan.title}?`
    );

    if (ans) {
      try {
        await api.delete(`plans/${plan.id}`);
        loadPlans();
        toast.success('Plano deletado com sucesso!');
      } catch (err) {
        toast.success('Ocorreu um erro ao deletar o plano!');
      }
    }
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando planos</strong>
        <aside>
          <Button type="button" onClick={() => history.push('/newPlan')}>
            <MdAdd color="#fff" size={20} />
            <span>Cadastrar</span>
          </Button>
        </aside>
      </header>
      <Table template="4fr 3fr 3fr 0.5fr 0.75fr" columns={5}>
        <thead>
          <tr>
            <th>TÍTULO</th>
            <th className="centerHead">DURAÇÃO</th>
            <th className="centerHead">VALOR p/ MÊS</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={String(plan.id)}>
              <td>{plan.title}</td>
              <td className="centerData">{plan.duration}</td>
              <td className="centerData">{plan.price}</td>
              <td className="alignRight">
                <button
                  type="button"
                  onClick={() => handleEdit(plan.id)}
                  className="editBtn"
                >
                  editar
                </button>
              </td>
              <td className="alignRight">
                <button
                  type="button"
                  onClick={() => handleDelete(plan)}
                  className="deleteBtn"
                >
                  apagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        hasNextPage={plans && plans.length >= 20}
        handlePageChange={loadPlans}
      />
    </Container>
  );
}
