import produce from 'immer';

const INITIAL_STATE = {
  student: null,
  id: null,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/CREATE_STUDENT_SUCCESS': {
        draft.student = action.payload.data;
        break;
      }
      case '@student/UPDATE_STUDENT_SUCCESS': {
        draft.student = action.payload.student;
        draft.id = action.payload.id;
        break;
      }

      default:
    }
  });
}
