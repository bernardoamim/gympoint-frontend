import { select, put, all, takeLatest } from 'redux-saga/effects';

import { updateSubjectSuccess, updateSubjectFailure } from './actions';

function* updateSubject({ newSubject }) {
  try {
    if (!newSubject) return;
    const currentSubject = yield select(state => state.subject.subject);

    if (newSubject === currentSubject) return;

    yield put(updateSubjectSuccess(newSubject));
  } catch (err) {
    console.tron.log('Erro ao atualizar o assunto');
    yield put(updateSubjectFailure());
  }
}

export default all([
  takeLatest('@subject/UPDATE_SUBJECT_REQUEST', updateSubject),
]);
