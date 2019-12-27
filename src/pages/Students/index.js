import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import history from '~/services/history';
import { Container } from './styles';
import SubmitButton from '~/components/Buttons/SubmitButton';
import Table from '~/components/Table';
import { updateSubjectRequest } from '~/store/modules/subject/actions';
import SearchBar from '~/components/SearchBar';
import api from '~/services/api';

export default function Students() {
  const [students, setStudents] = useState([]);

  async function loadStudents() {
    const response = await api.get('students');
    // {
    //   params: {
    //     name,
    //     page,
    //   },
    // });

    // setPage(response.data.page)
    setStudents(response.data);
  }

  useEffect(() => {
    loadStudents();
  }, []); //eslint-disable-line

  function handleEdit(id) {
    history.push(`/student/edit/${id}`);
  }

  async function handleDelete(student) {
    const ans = window.confirm(
      `Tem certeza que deseja deletar o aluno ${student.name}?`
    );

    if (ans) {
      try {
        // await api.delete(`students/${student.id}`);
        // loadStudents();
        toast.success('Aluno deletado com sucesso!');
      } catch (err) {
        toast.success('Aluno deletado com sucesso!');
      }
    }
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando alunos</strong>
        <aside>
          <SubmitButton>
            <MdAdd color="#fff" size={20} />
            <span>Cadastrar</span>
          </SubmitButton>
          <SearchBar />
        </aside>
      </header>
      <Table
        template="4fr 4fr 2fr 1.5fr 0.5fr"
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
    </Container>
  );
}
