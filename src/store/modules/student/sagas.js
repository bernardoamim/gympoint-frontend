import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import {
  createStudentSuccess,
  updateStudentSuccess,
  updateStudentFailure,
} from './actions';

export function* createStudent({ payload }) {
  try {
    const student = payload.data;

    console.tron.log(student);

    const response = yield call(api.post, 'students', student);

    toast.success('Aluno criado com sucesso!');

    yield put(createStudentSuccess(response.data));
  } catch (error) {
    console.tron.log(error);
    toast.error('Erro ao cadastrar aluno');
    yield put(updateStudentFailure());
  }
}

export function* updateStudent({ payload }) {
  try {
    const student = payload.data;

    console.tron.log(student);

    const response = yield call(api.put, `students/${payload.id}`, student);

    toast.success('Cadastro alterado com sucesso!');

    yield put(updateStudentSuccess(response.data));
  } catch (error) {
    toast.error('Erro ao alterar cadastro, verifique os dados');
    yield put(updateStudentFailure());
  }
}

export default all([
  takeLatest('@student/CREATE_STUDENT_REQUEST', createStudent),
  takeLatest('@student/UPDATE_STUDENT_REQUEST', updateStudent),
]);
