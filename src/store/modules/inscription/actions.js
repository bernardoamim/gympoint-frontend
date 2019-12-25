// Actions to CREATE Inscription
export function createInscriptionRequest(data) {
  return {
    type: '@inscription/CREATE_INSCRIPTION_REQUEST',
    payload: { data },
  };
}
export function createInscriptionSuccess(inscription) {
  return {
    type: '@inscription/CREATE_INSCRIPTION_SUCCESS',
    payload: { inscription },
  };
}

// Actions to UPDATE inscription
export function updateInscriptionRequest(id, data) {
  return {
    type: '@inscription/UPDATE_INSCRIPTION_REQUEST',
    payload: { id, data },
  };
}
export function updateInscriptionSuccess(inscription) {
  return {
    type: '@inscription/UPDATE_INSCRIPTION_SUCCESS',
    payload: { inscription },
  };
}

export function updateInscriptionFailure() {
  return {
    type: '@inscription/UPDATE_INSCRIPTION_FAILURE',
  };
}
