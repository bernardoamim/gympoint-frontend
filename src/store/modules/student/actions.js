// Actions to CREATE Student
export function createStudentRequest(data) {
  return {
    type: '@student/CREATE_STUDENT_REQUEST',
    payload: { data },
  };
}
export function createStudentSuccess(student) {
  return {
    type: '@student/CREATE_STUDENT_SUCCESS',
    payload: { student },
  };
}

// Actions to UPDATE STUDENT
export function updateStudentRequest(id, data) {
  return {
    type: '@student/UPDATE_STUDENT_REQUEST',
    payload: { id, data },
  };
}
export function updateStudentSuccess(student) {
  return {
    type: '@student/UPDATE_STUDENT_SUCCESS',
    payload: { student },
  };
}

export function updateStudentFailure() {
  return {
    type: '@student/UPDATE_STUDENT_FAILURE',
  };
}
