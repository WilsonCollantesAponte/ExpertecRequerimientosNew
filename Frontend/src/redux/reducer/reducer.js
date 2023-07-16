import {
  ACCESS,
  ACTUAL_USER,
  LOG_OUT,
  NOT_ACCESS,
  TYPE_FILTER,
} from "../actions-types/action-types";

const initialState = {
  actualUser: {},
  access: false,
  typeFilterVal: "ninguno",
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ACTUAL_USER:
      return { ...state, actualUser: payload };

    case ACCESS:
      return {
        ...state,
        access: true,
      };

    case NOT_ACCESS:
      return {
        ...state,
        access: false,
      };

    case LOG_OUT:
      return {
        ...state,
        actualUser: {},
        access: false,
      };

    case TYPE_FILTER:
      return {
        ...state,
        typeFilterVal: payload,
      };

    default:
      return state;
  }
}
