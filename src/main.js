import 'babel-polyfill'
import Search from './components/Search'
import Results from './components/Results'
import { UPDATE_ORIGIN, UPDATE_DESTINATION, UPDATE_DATE, RESULTS, SEARCH } from './actions'
import createStore from './store'
import '../bootstrap-sass.config.js'
import '!style!css!typeahead/style.css'
import '!style!css!bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css'
import datetimepicker from 'bootstrap-datepicker'
import moment from 'moment'

$.fn.datetimepicker = datetimepicker;

/**
 * @namespace stae
 * @type {Object}
 */
const initialState = {
  /**
   * [search description]
   * @type {Object}
   */
  search: {
    origin: undefined,
    destination: undefined,
    date: undefined
  },
  /**
   * [results description]
   * @type {Object}
   */
  results: [],
  searching: false
};

/**
 * App reducer
 * @param  {Object} state  Current app state
 * @param  {Action} action Dispatched action
 * @return {Object}        New app state
 */
const app = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORIGIN:
      console.log('Updating origin: ' + action.data.airportCode);
      return {
        ...state,
        search: {
          ...state.search,
          origin: action.data.airportCode
        }
      };
    case UPDATE_DESTINATION:
      console.log('Updating destination: ' + action.data.airportCode);
      return {
        ...state,
        search: {
          ...state.search,
          destination: action.data.airportCode
        }
      };
    case UPDATE_DATE:
      console.log('Updating date: ' + action.data.date);
      return {
        ...state,
        search: {
          ...state.search,
          date: action.data.date
        }
      };
    case SEARCH:
      return {
        ...state,
        searching: true
      };
    case RESULTS:
      return {
        ...state,
        searching: false,
        results: action.data.results
      };
    default:
      return state;
  }
}

const store = createStore(app, initialState);

const search = new Search({
  store,
  selector: '#search'
});

const results = new Results({
  store,
  selector: '#results'
});
