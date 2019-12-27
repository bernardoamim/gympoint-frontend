import { all } from 'redux-saga/effects';
import auth from './auth/sagas';
import subject from './subject/sagas';
import student from './student/sagas';
import page from './page/sagas';
import plan from './plan/sagas';
import inscription from './inscription/sagas';

export default function* rootSaga() {
  return yield all([auth, subject, student, page, plan, inscription]);
}
