import produce from 'immer';

const INITIAL_STATE = {
  subject: null,
};

export default function subject(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@subject/UPDATE_SUBJECT_SUCCESS': {
        draft.subject = action.newSubject;
        break;
      }
      default:
    }
  });
}
