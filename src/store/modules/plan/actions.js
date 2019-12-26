// Actions to CREATE Plan
export function createPlanRequest(data) {
  return {
    type: '@plan/CREATE_PLAN_REQUEST',
    payload: { data },
  };
}
export function createPlanSuccess(plan) {
  return {
    type: '@plan/CREATE_PLAN_SUCCESS',
    payload: { plan },
  };
}

// Actions to UPDATE Plan
export function updatePlanRequest(id, data) {
  return {
    type: '@plan/UPDATE_PLAN_REQUEST',
    payload: { id, data },
  };
}
export function updatePlanSuccess(plan) {
  return {
    type: '@plan/UPDATE_PLAN_SUCCESS',
    payload: { plan },
  };
}

export function updatePlanFailure() {
  return {
    type: '@plan/UPDATE_PLAN_FAILURE',
  };
}
