import { select, put, all, takeLatest } from 'redux-saga/effects';

import { updatePageSuccess, updatePageFailure } from './actions';

function* updatePage({ newPage }) {
  try {
    if (!newPage) return;
    const currentPage = yield select(state => state.page.page);

    if (newPage === currentPage) return;

    yield put(updatePageSuccess(newPage));
  } catch (err) {
    console.tron.log('Erro ao atualizar a página');
    yield put(updatePageFailure());
  }
}

export default all([takeLatest('@page/UPDATE_PAGE_REQUEST', updatePage)]);
