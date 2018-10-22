import axios from 'axios';
import {
  GET_SEARCH_RESULTS,
  SET_SEARCH_RESULT,
  SET_PLACE_PHOTOS,
} from '../types';

/**
 * @class SearchPlaces
 */
export default class SearchPlaces {

  /**
   * @returns {*} response
   * @param {*} searchKey
   */
  static getSearchResults(searchKey) {
    return (dispatch) => {
      return axios.get(`/api/v1/autocomplete/${searchKey}`)
        .then((response) => {
          dispatch({
            type: GET_SEARCH_RESULTS,
            predictions: response.data.results
          });
          return response.data.results;
        });
    };
  }

  /**
   * @returns {*} null
   * @param {*} placeId
   */
  static getPlaceDetails(placeId) {
    return (dispatch) => {
      return axios.get(`/api/v1/placedetails/${placeId}`)
        .then((response) => {
          dispatch({
            type: SET_SEARCH_RESULT,
            resultClicked: response.data.results.result,
          });
          return response.data.results;
        });
    };
  }

  /**
   *
   * @param {*} photoReferenceId
   */
  static getPlacePhotos(photoReferenceId) {
    return (dispatch) => {
      return axios.get(`/api/v1/placephotos/${photoReferenceId}`)
        .then((response) => {
          dispatch({
            type: SET_PLACE_PHOTOS,
            placePhotos: response.data,
          });
          return response.data.results;
        });
    };
  }
}
