import produce from 'immer';

const INITIAL_STATE = {
  inscription: null,
  id: null,
};

export default function inscription(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@inscription/CREATE_INSCRIPTION_SUCCESS': {
        draft.inscription = action.payload.data;
        break;
      }
      case '@inscription/UPDATE_INSCRIPTION__SUCCESS': {
        draft.inscription = action.payload.inscription;
        draft.id = action.payload.id;
        break;
      }

      default:
    }
  });
}
