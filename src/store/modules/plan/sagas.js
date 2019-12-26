import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import {
  createPlanSuccess,
  updatePlanSuccess,
  updatePlanFailure,
} from './actions';

export function* createPlan({ payload }) {
  try {
    const plan = payload.data;

    console.tron.log(plan);

    const response = yield call(api.post, 'plans', plan);

    toast.success('Plano criado com sucesso!');

    yield put(createPlanSuccess(response.data));
  } catch (error) {
    console.tron.log(error);
    toast.error('Erro ao cadastrar plano');
    yield put(updatePlanFailure());
  }
}

export function* updatePlan({ payload }) {
  try {
    const plan = payload.data;

    console.tron.log(plan);

    const response = yield call(api.put, `plans/${payload.id}`, plan);

    toast.success('Plano alterado com sucesso!');

    yield put(updatePlanSuccess(response.data));
  } catch (error) {
    toast.error('Erro ao alterar plano, verifique os dados');
    yield put(updatePlanFailure());
  }
}

export default all([
  takeLatest('@plan/CREATE_PLAN_REQUEST', createPlan),
  takeLatest('@plan/UPDATE_PLAN_REQUEST', updatePlan),
]);
