import produce from 'immer';

const INITIAL_STATE = {
  page: 1,
};

export default function page(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@page/UPDATE_PAGE_SUCCESS': {
        draft.page = action.newPage;
        break;
      }
      default:
    }
  });
}
