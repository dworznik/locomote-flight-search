import Promise from 'bluebird'
import express from 'express'
import rp from 'request-promise'
import _ from 'lodash'
const routes = express.Router();

const apiBase = 'http://node.locomote.com/code-task';

routes.get('/airlines', (req, res) => {
  return proxy(req, res);
});

routes.get('/airports', (req, res) => {
  return proxy(req, res);
});

routes.get('/search', (req, res) => {
  rp({
    uri: `${apiBase}/airlines`,
    json: true
  }).then(data => {
    const promises = data.map(a => {
      return rp({
        uri: `${apiBase}/flight_search/${a.code}`,
        qs: {
          from: req.query.from,
          to: req.query.to,
          date: req.query.date
        },
        json: true
      }).promise();
    });
    Promise.all(promises.map(p => {
      return p.reflect();
    })).map(inspection => {
      if (inspection.isFulfilled()) {
        return inspection.value();
      } else {
        console.error('Flight API request failed: ', inspection.reason().message);
      }
    }).reduce((acc, val) => {
      if (val) {
        return acc.concat(val);
      } else {
        return acc;
      }
    }, []).then(result => {
      res.status(200).json(result);
    }).catch(err => {
      res.status(503).send(err.message);
    });
  }).catch(err => {
    res.status(503).send(err.message);
  });
});


const proxy = function(req, res) {
  req.pipe(rp({
    url: req.url,
    baseUrl: apiBase,
    method: req.method,
    json: true
  })).pipe(res);
}

const responseToJson = function(response) {
  if (response.status >= 400) {
    let err = new Error(response.statusText);
    err.response = response;
    throw err;
  }
  return response.json();
}

const catchError = function(res) {
  return function(err) {
    if (err.response) {
      res.status(err.response.status);
      return err.response.text();
    } else {
      return;
    }
  }
}

const sendError = function(res) {
  return function(data) {
    res.type('text/plain; charset=utf-8');
    if (data) {
      res.send(data);
    } else {
      res.status(503).send();
    }
  }
}

export default routes;