import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import {
  createInscriptionSuccess,
  updateInscriptionSuccess,
  updateInscriptionFailure,
} from './actions';

export function* createInscription({ payload }) {
  try {
    const inscription = payload.data;

    console.tron.log(inscription);

    const response = yield call(api.post, 'inscriptions', inscription);

    toast.success('Matrícula criada com sucesso!');

    yield put(createInscriptionSuccess(response.data));
  } catch (error) {
    console.tron.log(error);
    toast.error('Erro ao cadastrar matrícula');
    yield put(updateInscriptionFailure());
  }
}

export function* updateInscription({ payload }) {
  try {
    const inscription = payload.data;

    console.tron.log(inscription);

    const response = yield call(
      api.put,
      `inscriptions/${payload.id}`,
      inscription
    );

    toast.success('matrícula alterada com sucesso!');

    yield put(updateInscriptionSuccess(response.data));
  } catch (error) {
    toast.error('Erro ao alterar matrícula, verifique os dados');
    yield put(updateInscriptionFailure());
  }
}

export default all([
  takeLatest('@inscription/CREATE_INSCRIPTION_REQUEST', createInscription),
  takeLatest('@inscription/UPDATE_INSCRIPTION_REQUEST', updateInscription),
]);
