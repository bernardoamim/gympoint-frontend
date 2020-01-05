import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { Container, ModalStyles, Content } from './styles';
import Table from '~/components/Table';
import Pagination from '~/components/Pagination';
import api from '~/services/api';
import { updateSubjectRequest } from '~/store/modules/subject/actions';

const schema = Yup.object().shape({
  answer: Yup.string().required('*Campo obrigatório'),
});

export default function HelpOrders() {
  Modal.setAppElement('#root');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  async function loadOrders(page = 1) {
    const response = await api.get('help-orders', {
      params: {
        page,
      },
    });

    setCurrentPage(page);
    setOrders(response.data.helpOrders);
  }

  useEffect(() => {
    dispatch(updateSubjectRequest('order'));
    loadOrders();
  }, []); //eslint-disable-line

  function handleAnswer(order) {
    setIsOpen(true);
    setSelectedOrder(order);
  }

  function handleClose() {
    setIsOpen(false);
  }

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await api.post(`help-orders/${selectedOrder.id}/answer`, data);
      setLoading(false);
      setIsOpen(false);
      toast.success('Resposta enviada com sucesso!');
    } catch (err) {
      setLoading(false);
      setIsOpen(false);
      toast.error('Falha no envio da resposta!');
    }
    loadOrders();
  }

  return (
    <Container>
      <header>
        <strong>Pedidos de auxílio</strong>
      </header>
      <Table template="3fr 1fr" columns={2}>
        <thead>
          <tr>
            <th>ALUNO</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={String(order.id)}>
              <td>{order.student.name}</td>
              <td className="alignRight">
                <button
                  type="button"
                  onClick={() => handleAnswer(order)}
                  className="editBtn"
                >
                  responder
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        hasNextPage={orders && orders.length >= 20}
        handlePageChange={loadOrders}
      />
      <Modal
        style={ModalStyles}
        isOpen={modalIsOpen}
        contentLabel="Example Modal"
        onRequestClose={handleClose}
      >
        <Content>
          <Form onSubmit={handleSubmit} schema={schema}>
            <strong>PERGUNTA DO ALUNO</strong>
            <p>{selectedOrder.question}</p>
            <strong>SUA RESPOSTA</strong>
            <Input name="answer" multiline placeholder="exemplo@email.com" />
            <button type="submit">
              <span>{loading ? 'Enviando...' : 'Responder aluno'}</span>
            </button>
          </Form>
        </Content>
      </Modal>
    </Container>
  );
}
