import produce from 'immer';

const INITIAL_STATE = {
  plan: null,
  id: null,
};

export default function plan(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plan/CREATE_PLAN_SUCCESS': {
        draft.plan = action.payload.data;
        break;
      }
      case '@plan/UPDATE_PLAN_SUCCESS': {
        draft.plan = action.payload.plan;
        draft.id = action.payload.id;
        break;
      }

      default:
    }
  });
}
