import { SET_CURRENT_USER } from '../types';

const initialState = {
  isAuthenticated: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return {
        isAuthenticated: true
      };
    }
    default: return state;
  }
};
