import { combineReducers } from 'redux';

import auth from './auth/reducer';
import subject from './subject/reducer';
import student from './student/reducer';

export default combineReducers({
  auth,
  subject,
  student,
});
