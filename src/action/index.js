export const ADD_DATA = 'ADD_DATA';
export function addData(payload) {
  return {
    type: ADD_DATA,
    payload
  };
}

export const DELETE_DATA = 'DELETE_DATA';
export function deleteData(payload) {
  return {
    type: DELETE_DATA,
    payload
  };
}

export const UPDATE_DATA = 'UPDATE_DATA';
export function updateData(payload) {
  return {
    type: UPDATE_DATA,
    payload
  };
}

export const SEARCH = 'SEARCH';
export function search(payload) {
  return {
    type: SEARCH,
    payload
  }
}
