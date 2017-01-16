export const SEARCH = 'SEARCH'
export const RESULTS = 'RESULTS'


export const UPDATE_DATE = 'UPDATE_DATE'
export const UPDATE_ORIGIN = 'UPDATE_ORIGIN';
export const UPDATE_DESTINATION = 'UPDATE_DESTINATION';

import fetch from 'isomorphic-fetch';
import { findFlights, findAirports } from './data'
import moment from 'moment'


/**
 * @typedef {Object} Action
 * @property {string} type Action type
 * @property {(Object|Array)} data Action data
 */


export function updateOrigin(airportCode) {
  return {
    type: UPDATE_ORIGIN,
    data: {
      airportCode
    }
  };
}


export function updateDestination(airportCode) {
  return {
    type: UPDATE_DESTINATION,
    data: {
      airportCode
    }
  };
}


export function updateDate(date) {
  return {
    type: UPDATE_DATE,
    data: {
      date: moment(date)
    }
  };
}


export function updateResults(results) {
  return {
    type: RESULTS,
    data: {
      results
    }
  };
}

export function asyncSearchFlights() {
  return ({dispatch, getState}) => {
    findFlights(getState().search).then((data) => {
      dispatch(updateResults(data));
    });
    return {
      type: SEARCH
    }
  }

}
