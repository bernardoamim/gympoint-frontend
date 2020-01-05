// Actions to UPDATE page
export function updatePageRequest(newPage) {
  return {
    type: '@page/UPDATE_PAGE_REQUEST',
    newPage,
  };
}
export function updatePageSuccess(newPage) {
  return {
    type: '@page/UPDATE_PAGE_SUCCESS',
    newPage,
  };
}

export function updatePageFailure() {
  return {
    type: '@page/UPDATE_PAGE_FAILURE',
  };
}
