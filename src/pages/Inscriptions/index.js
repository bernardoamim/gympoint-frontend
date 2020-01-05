import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { toast } from 'react-toastify';
import history from '~/services/history';
import { Container } from './styles';
import { Button } from '~/components/Buttons/SubmitButton/styles';
import Table from '~/components/Table';
import Pagination from '~/components/Pagination';
import api from '~/services/api';
import { updateSubjectRequest } from '~/store/modules/subject/actions';
import { formatPrice, capitalizeMonth } from '~/util/format';

export default function Inscriptions() {
  const dispatch = useDispatch();
  const [inscriptions, setInscriptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  async function loadInscriptions(page = 1) {
    const response = await api.get('inscriptions', {
      params: {
        page,
      },
    });

    setCurrentPage(page);
    setInscriptions(
      response.data.map(inscription => ({
        ...inscription,
        price: formatPrice(inscription.price),
        start_date: capitalizeMonth(
          format(parseISO(inscription.start_date), "dd' de 'MMMM' de 'yyyy", {
            locale: pt,
          })
        ),
        end_date: capitalizeMonth(
          format(parseISO(inscription.end_date), "dd' de 'MMMM' de 'yyyy", {
            locale: pt,
          })
        ),
      }))
    );
  }

  useEffect(() => {
    dispatch(updateSubjectRequest('inscription'));
    loadInscriptions();
  }, []); //eslint-disable-line

  function handleEdit(id) {
    history.push(`/editInscription/${id}`);
  }

  async function handleDelete(inscription) {
    // eslint-disable-next-line no-alert
    const ans = window.confirm(
      `Tem certeza que deseja deletar a matrícula de ${inscription.student.name}?`
    );

    if (ans) {
      try {
        await api.delete(`inscriptions/${inscription.id}`);
        loadInscriptions();
        toast.success('Matrícula deletada com sucesso!');
      } catch (err) {
        toast.success('Ocorreu um erro ao deletar a matrícula!');
      }
    }
  }
  return (
    <Container>
      <header>
        <strong>Gerenciando matrículas</strong>
        <aside>
          <Button type="button" onClick={() => history.push('/newInscription')}>
            <MdAdd color="#fff" size={20} />
            <span>Cadastrar</span>
          </Button>
        </aside>
      </header>
      <Table template="2fr 1fr 2fr 2fr 1fr 0.5fr 0.5fr" columns={7}>
        <thead>
          <tr>
            <th>ALUNO</th>
            <th className="centerHead">PLANO</th>
            <th className="centerHead">INÍCIO</th>
            <th className="centerHead">TÉRMINO</th>
            <th className="centerHead">ATIVA</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {inscriptions.map(inscription => (
            <tr key={String(inscription.id)}>
              <td>{inscription.student.name}</td>
              <td className="centerData">{inscription.plan.title}</td>
              <td className="centerData">{inscription.start_date}</td>
              <td className="centerData">{inscription.end_date}</td>
              <td className="centerData">
                {inscription.isActive ? (
                  <MdCheckCircle color="#42cb59" size={20} />
                ) : (
                  <MdCheckCircle color="#ddd" size={20} />
                )}
              </td>
              <td className="alignRight">
                <button
                  type="button"
                  onClick={() => handleEdit(inscription.id)}
                  className="editBtn"
                >
                  editar
                </button>
              </td>
              <td className="alignRight">
                <button
                  type="button"
                  onClick={() => handleDelete(inscription)}
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
        hasNextPage={inscriptions && inscriptions.length >= 20}
        handlePageChange={loadInscriptions}
      />
    </Container>
  );
}
