
/**
 * @typedef {Store}
 * @property {Function} getState
 * @property {Function} dispatch
 * @property {Function} subscribe
 */

/**
 * Creates a store
 * @param  {Function} reducer App reducer
 * @param  {Object} initialState Initial state
 * @return {[type]}              [description]
 */
export default (reducer, initialState = {}) => {

  var state = initialState;
  var dispatching = false;
  var listeners = [];

  /**
   * Returns the state
   * @return {Object} Store state
   */
  const getState = () => {
    return state;
  }

  /**
   * Subscribes a function to any change to the store
   * @param  {Function} listener Listener function
   * @return {undefined}
   */
  const subscribe = (listener) => {
    listeners.push(listener);
  }

  /**
   * Dispatches an action
   * @param  {Action} action Action to dispatch
   * @return {Action}        Dispatched action
   */
  const dispatch = (action) => {
    if (dispatching) {
      throw new Error('Concurrent dispatches');
    }
    try {
      state = reducer(state, action);
    } finally {
      dispatching = false;
    }

    var ls = listeners.slice(0);
    for (var i = 0; i < ls.length; i++) {
      var listener = ls[i];
      listener();
    }
    return action;
  }

  const validateInput = () => {
    const search = state.search;
    console.log(search.date);
    let errors = new Set(['origin', 'destination', 'date'].filter(f => _.isEmpty(search[f])));
    if (search.origin == search.destination) {
      errors = new Set([...errors, ...['origin', 'destination']]);
    }
    return errors;
  }

  return {
    getState,
    dispatch,
    subscribe,
    validateInput
  }
}