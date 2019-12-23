// Actions to UPDATE subject
export function updateSubjectRequest(newSubject) {
  return {
    type: '@subject/UPDATE_SUBJECT_REQUEST',
    newSubject,
  };
}
export function updateSubjectSuccess(newSubject) {
  return {
    type: '@subject/UPDATE_SUBJECT_SUCCESS',
    newSubject,
  };
}

export function updateSubjectFailure() {
  return {
    type: '@subject/UPDATE_SUBJECT_FAILURE',
  };
}
