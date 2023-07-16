import {
  ACCESS,
  ACTUAL_USER,
  // ADD_REQUIREMENT,
  LOG_OUT,
  NOT_ACCESS,
  TYPE_FILTER,
} from "../actions-types/action-types";

export function defActualUser(user) {
  return {
    type: ACTUAL_USER,
    payload: user,
  };
}

export function access() {
  return {
    type: ACCESS,
  };
}

export function notAccess() {
  return {
    type: NOT_ACCESS,
  };
}

export function logOut() {
  return {
    type: LOG_OUT,
  };
}

// export function addRequirement(listRequirements) {
//   return {
//     type: ADD_REQUIREMENT,
//     payload: listRequirements,
//   };
// }

export function typeFilter(mode) {
  return {
    type: TYPE_FILTER,
    payload: mode,
  };
}
