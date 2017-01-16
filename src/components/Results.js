import { updateFrom, updateTo, asyncSearchFlights, updateDate } from '../actions'
import Transparency from 'transparency'
import moment from 'moment'
import 'moment-duration-format'

jQuery.fn.render = Transparency.jQueryPlugin;

const daysHtml = `
<div id="days" class="row">
  <div class="btn-group days" role="group">
    <span class="day"></span>
  </div>
</div class="row">
`

const listHtml = `
<div id="flights">
  <div class="flight row">
      <div class="col-md-2 airline"></div>
      <div class="col-md-3 start"></div>
      <div class="col-md-2 duration"></div>
      <div class="col-md-3 finish"></div>
      <div class="col-md-2 price"></div>
  </div>
</div>

`

export default class Results {
  /**
   * [constructor description]
   * @param  {Store} options.store    [description]
   * @param  {string} options.selector
   * @return {Search}                  [description]
   */
  constructor({store, selector}) {
    this.html = $(selector);
    this.store = store;
    this.store.subscribe(this.render.bind(this));

    this.dayList = () => {
      return $('#days');
    };

    this.flightList = () => {
      return $('#flights');
    };
    this.render();
  }

  /**
   * Renders the store data
   * @return {undefined}
   */
  render() {
    const state = this.store.getState();
    if (state.searching) {
      this._searchInProgress();
    } else if (!_.isEmpty(state.results)) {
      this._clearResults();
      this._renderResults(state.results, state.search.date);
    }
  }

  _clearResults() {
    this.flightList().remove();
  }

  _searchInProgress() {
    this._clearResults();
    console.log('Searching...');
  }


  _renderResults(results, date) {
    const decorator = (field) => {
      return function() {
        const datetime = moment(this[field].dateTime).format('DD/MM hh:mm');
        const airport = this[field].airportCode;
        return '<span class="datetime">' + datetime + '</span> <span class="airport">' + airport + '</span>';
      };
    };

    // console.log('Rendering results: ' + JSON.stringify(results));

    const day = moment(date);
    const cur = day.clone().subtract(3, 'days');
    const end = day.clone().add(3, 'days');

    const days = [];
    while (cur.add(1, 'days').diff(end) < 0) {
      days.push({
        date: cur.clone(),
        current: cur.isSame(day, 'day')
      });
    }

    const daysDirs = {
      day: {
        html: function(params) {
          let cls = 'btn btn-default day';
          if (this.current) {
            cls = 'btn btn-primary day';
          }
          return `<button type="button" class="${cls}" data-date="${this.date.format('YYYY-MM-DD')}">${this.date.format('DD/MM dddd')}</button>`;
        }
      }
    };

    const resDirs = {
      start: {
        html: decorator('start')
      },
      finish: {
        html: decorator('finish')
      },
      airline: {
        text: function(params) {
          return this.airline.name;
        }
      },
      duration: {
        html: function(params) {
          const dur = moment.duration(this.durationMin, 'minutes').format('hh[h]mm[m]');
          return '<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>&nbsp;' + dur + '&nbsp;<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"> </span>';
        }
      },
      price: {
        html: function(perams) {
          return '<a class="btn btn-success" href="https://procatinator.com">Buy for $' + this.price + '</a>';
        }
      }
    };

    if (this.dayList().length) {
      this.dayList().replaceWith(daysHtml);
    } else {
      this.html.append(daysHtml);
    }

    if (this.flightList().length) {
      this.flightList().replaceWith(listHtml);
    } else {
      this.html.append(listHtml);
    }

    this.dayList().render(days, daysDirs);
    this.dayList().on('click', 'button', e => {
      const date = $(e.currentTarget).data('date');
      console.log(date);
      this.store.dispatch(updateDate(date));
      this.store.dispatch(asyncSearchFlights()(this.store));
      return e.preventDefault();
    });

    this.flightList().render(results, resDirs);
  }
}