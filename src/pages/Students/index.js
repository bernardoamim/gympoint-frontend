import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import history from '~/services/history';
import { Container } from './styles';
import { Button } from '~/components/Buttons/SubmitButton/styles';
import Table from '~/components/Table';
import SearchBar from '~/components/SearchBar';
import Pagination from '~/components/Pagination';
import api from '~/services/api';
import { updateSubjectRequest } from '~/store/modules/subject/actions';

export default function Students() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  async function loadStudents(page = 1) {
    const response = await api.get('students', {
      params: {
        q: name,
        page,
      },
    });

    setCurrentPage(page);
    setStudents(response.data);
  }

  useEffect(() => {
    dispatch(updateSubjectRequest('student'));
    loadStudents();
  }, []); //eslint-disable-line

  useEffect(() => {
    loadStudents();
  }, [name]); //eslint-disable-line

  function handleEdit(id) {
    history.push(`/editStudent/${id}`);
  }

  async function handleDelete(student) {
    // eslint-disable-next-line no-alert
    const ans = window.confirm(
      `Tem certeza que deseja deletar o aluno ${student.name}?`
    );

    if (ans) {
      try {
        await api.delete(`students/${student.id}`);
        loadStudents();
        toast.success('Aluno deletado com sucesso!');
      } catch (err) {
        toast.error('Ocorreu um erro ao deletar o aluno!');
      }
    }
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando alunos</strong>
        <aside>
          <Button type="button" onClick={() => history.push('/newStudent')}>
            <MdAdd color="#fff" size={20} />
            <span>Cadastrar</span>
          </Button>
          <SearchBar handleChange={e => setName(e.target.value)} />
        </aside>
      </header>
      <Table
        template="4fr 4fr 2fr 1fr 0.75fr"
        countRowns={students.length}
        columns={5}
      >
        <thead>
          <tr>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th className="centerHead">IDADE</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={String(student.id)}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td className="centerData">{student.age}</td>
              <td className="alignRight">
                <button
                  type="button"
                  onClick={() => handleEdit(student.id)}
                  className="editBtn"
                >
                  editar
                </button>
              </td>
              <td className="alignRight">
                <button
                  type="button"
                  onClick={() => handleDelete(student)}
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
        hasNextPage={students && students.length >= 20}
        handlePageChange={loadStudents}
      />
    </Container>
  );
}
