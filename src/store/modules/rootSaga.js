import { all } from 'redux-saga/effects';
import auth from './auth/sagas';
import subject from './subject/sagas';
import page from './page/sagas';

export default function* rootSaga() {
  return yield all([auth, subject, page]);
}
