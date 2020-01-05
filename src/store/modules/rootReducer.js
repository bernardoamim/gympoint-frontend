import { combineReducers } from 'redux';

import auth from './auth/reducer';
import subject from './subject/reducer';
import page from './page/reducer';

export default combineReducers({
  auth,
  subject,
  page,
});
