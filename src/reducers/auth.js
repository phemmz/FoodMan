import {
  SET_CURRENT_USER,
  GET_SEARCH_RESULTS,
  SET_PLACE_PHOTOS,
  SET_SEARCH_RESULT,
} from '../types';

const initialState = {
  isAuthenticated: false,
  placePhotos: {},
  searchResults: {},
  resultClicked: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: true
      };
    case GET_SEARCH_RESULTS:
      return { ...state, searchResults: action.predictions };
    case SET_SEARCH_RESULT:
      return { ...state, resultClicked: action.resultClicked };
    case SET_PLACE_PHOTOS:
      return { ...state, placePhotos: action.placePhotos };
    default: return state;
  }
};
