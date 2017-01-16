import { updateOrigin, updateDestination, updateDate, asyncSearchFlights } from '../actions'
import { findAirports } from '../actions/data'
import Typeahead from 'typeahead'
import moment from 'moment'

const formHtml = `
<form action="" method="post" role="form">
    <div class="row">
      <div class="form-group col-md-4">
        <input type="search" id="origin" value="" class="form-control" placeholder="Origin">
      </div>
      <div class="form-group col-md-4">
        <input type="search" id="destination" value="" class="form-control" placeholder="Destination">
      </div>
      <div class="from-group col-md-2">
          <div class="input-group date" id="date">
            <input type="text" class="form-control" />
            <span class="input-group-addon">
              <span class="glyphicon glyphicon-calendar"></span>
            </span>
        </div>
      </div>
      <div class="col-md-2 form-group">
        <button id="button" class="btn btn-primary">Search flights</button>
      </div>
  </div>
</form>
`

const BTN_SEARCH = 'Search flights';
const BTN_SEARCHING = 'Searching...';

export default class Search {

  /**
   * [constructor description]
   * @param  {Store} options.store    [description]
   * @param  {string} options.selector 
   * @return {Search}                  [description]
   */
  constructor({store, selector}) {
    this.button = () => {
      return $('#button')
    };
    this.origin = () => {
      return $('#origin')
    };
    this.destination = () => {
      return $('#destination')
    };

    this.date = () => {
      return $('#date');
    };

    $(selector).append(formHtml);

    this.origin().click((e) => {
      e.target.select();
      return e.preventDefault()
    });

    this.destination().click((e) => {
      e.target.select();
      return e.preventDefault()
    });

    this.button().click((e) => {
      const state = this.store.getState();
      $('.has-error').removeClass('has-error');
      const errors = this.store.validateInput()
      if (errors.size) {
        console.log('Invalid input: ' + Array.from(errors));
        for (let field of errors) {
          $(`#${field}`).parent().addClass('has-error');
        }
      } else {
        this.store.dispatch(asyncSearchFlights()(store));
      }
      console.log(JSON.stringify(state));
      return e.preventDefault();
    });


    const taOrigin = new Typeahead('#origin', {
      matcher: () => true,
      source: function(query, result) {
        findAirports(query).then(data => {
          if (data) {
            result(data.map(i => i['cityName'] + ' | ' + i['airportName'] + ' | ' + i['airportCode']));
          }
        })

      }
    });

    const taDestination = new Typeahead('#destination', {
      matcher: () => true,
      source: function(query, result) {
        findAirports(query).then(data => {
          if (data) {
            result(data.map(i => i['cityName'] + ' | ' + i['airportName'] + ' | ' + i['airportCode']));
          }
        })

      }
    });

    this.origin().on('change', () => {
      this.origin().parent().removeClass('has-error');
      const code = _.last(this.origin().val().split('|')).trim()
      this.store.dispatch(updateOrigin(code));
    });

    this.destination().on('change', () => {
      this.destination().parent().removeClass('has-error');
      const code = _.last(this.destination().val().split('|')).trim()
      this.store.dispatch(updateDestination(code));
    });

    this.date().datepicker({
      startDate: '0d',
      format: 'yyyy-mm-dd',
      autoclose: true
    }).on('changeDate', (e) => {
      this.date().parent().removeClass('has-error');
      this.store.dispatch(updateDate(e.date));
    });

    this.store = store;
    this.store.subscribe(() => {
      const state = this.store.getState();
      if (state.searching) {
        this.button().prop('disabled', true);
        this.button().text(BTN_SEARCHING);
      }
      if (state.results && !state.searching) {
        this.button().text(BTN_SEARCH);
        this.button().prop('disabled', false);
      }
      if (state.search.date && state.search.date.format('YYYY-MM-DD') != this.date().val()) {
        this.date().datepicker('update', state.search.date.format('YYYY-MM-DD'));
      }

    });
  }
}