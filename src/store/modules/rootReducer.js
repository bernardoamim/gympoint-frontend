import { combineReducers } from 'redux';

import auth from './auth/reducer';
import subject from './subject/reducer';
import student from './student/reducer';
import page from './page/reducer';
import plan from './plan/reducer';
import inscription from './inscription/reducer';

export default combineReducers({
  auth,
  subject,
  student,
  page,
  plan,
  inscription,
});
