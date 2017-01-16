import fetch from 'isomorphic-fetch';

export function findFlights(search) {
  console.log('findFlights');
  console.log(search);
  return fetch(`/search?from=${search.origin}&to=${search.destination}&date=${search.date.format('YYYY-MM-DD')}`).then(res => {
    console.log(res);
    if (res.status >= 400) {
      throw new Error('Invalid response');
    } else {
      return res.json();
    }
  }).catch(err => {
    //ignore
  });
}


export function findAirports(query) {
  return fetch(`/airports?q=${query}`).then(res => {
    if (res.status >= 400) {
      throw new Error('Invalid response');
    } else {
      return res.json();
    }
  }).then(json => {
    console.log(json);
    return json.filter((item) => {
      return ~item['airportName'].toLowerCase().indexOf(query.toLowerCase()) ||
        ~item['cityName'].toLowerCase().indexOf(query.toLowerCase()) ||
        ~item['airportCode'].toLowerCase().indexOf(query.toLowerCase())
    });
  }).catch(err => {
    // ignore
  });;
}


// Dummy data

export function dummyFindFlights() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(flights()), 400)
  })
}

export function dummyfindAirports(query) {
  return new Promise((resolve, reject) => {
    const result = fetch.filter((item) => {
      return ~item['airportName'].toLowerCase().indexOf(query.toLowerCase()) ||
        ~item['cityName'].toLowerCase().indexOf(query.toLowerCase()) ||
        ~item['airportCode'].toLowerCase().indexOf(query.toLowerCase())
    });
    setTimeout(() => resolve(result), 150)
  })
}


export function airports() {
  return [
    {
      "airportCode": "SRG",
      "airportName": "Achmad Uani Arpt",
      "cityCode": "SRG",
      "cityName": "Semarang",
      "countryCode": "ID",
      "countryName": "Indonesia",
      "latitude": -6.971447,
      "longitude": 110.374122,
      "stateCode": "",
      "timeZone": "Asia/Jakarta"
    },
    {
      "airportCode": "ANR",
      "airportName": "Antwerp Brussels North",
      "cityCode": "ANR",
      "cityName": "Antwerp",
      "countryCode": "BE",
      "countryName": "Belgium",
      "latitude": 51.189444,
      "longitude": 4.460278,
      "stateCode": "",
      "timeZone": "Europe/Brussels"
    },
    {
      "airportCode": "TSE",
      "airportName": "Astana Arpt",
      "cityCode": "TSE",
      "cityName": "Astana",
      "countryCode": "KZ",
      "countryName": "Kazakhstan",
      "latitude": 51.022222,
      "longitude": 71.466944,
      "stateCode": "",
      "timeZone": "Asia/Qyzylorda"
    },
    {
      "airportCode": "LKL",
      "airportName": "Banak Airport",
      "cityCode": "LKL",
      "cityName": "Lakselv",
      "countryCode": "NO",
      "countryName": "Norway",
      "latitude": 70.068814,
      "longitude": 24.973489,
      "stateCode": "",
      "timeZone": "Europe/Oslo"
    },
    {
      "airportCode": "BSL",
      "airportName": "Basel EuroAirport Swiss",
      "cityCode": "BSL",
      "cityName": "Basel",
      "countryCode": "CH",
      "countryName": "Switzerland",
      "latitude": 47.59,
      "longitude": 7.529167,
      "stateCode": "",
      "timeZone": "Europe/Paris"
    },
    {
      "airportCode": "YBV",
      "airportName": "Berens River Arpt",
      "cityCode": "YBV",
      "cityName": "Berens River Indian Reserve",
      "countryCode": "CA",
      "countryName": "Canada",
      "latitude": 52.358889,
      "longitude": -97.018333,
      "stateCode": "MB",
      "timeZone": "America/Winnipeg"
    },
    {
      "airportCode": "LGG",
      "airportName": "Bierset Airport",
      "cityCode": "LGG",
      "cityName": "Liege",
      "countryCode": "BE",
      "countryName": "Belgium",
      "latitude": 50.637417,
      "longitude": 5.443222,
      "stateCode": "",
      "timeZone": "Europe/Brussels"
    },
    {
      "airportCode": "TLS",
      "airportName": "Blagnac Arpt",
      "cityCode": "TLS",
      "cityName": "Toulouse",
      "countryCode": "FR",
      "countryName": "France",
      "latitude": 43.629075,
      "longitude": 1.363819,
      "stateCode": "",
      "timeZone": "Europe/Paris"
    },
    {
      "airportCode": "BOI",
      "airportName": "Boise Municipal Arpt Gowen Field",
      "cityCode": "BOI",
      "cityName": "Boise",
      "countryCode": "US",
      "countryName": "United States",
      "latitude": 43.564361,
      "longitude": -116.222861,
      "stateCode": "ID",
      "timeZone": "America/Denver"
    },
    {
      "airportCode": "BWN",
      "airportName": "Brunei Intl Arpt",
      "cityCode": "BWN",
      "cityName": "Bandar Seri Begawan",
      "countryCode": "BN",
      "countryName": "Brunei Darussalam",
      "latitude": 4.9442,
      "longitude": 114.928353,
      "stateCode": "",
      "timeZone": "Asia/Brunei"
    }
  ];
}

export function flights() {
  return [
    {
      "key": "U1UxOTYgMTUwNDE5MTYwMDAwMA==",
      "airline": {
        "code": "SU",
        "name": "Aeroflot"
      },
      "flightNum": 196,
      "start": {
        "dateTime": "2017-09-01T20:52:00+09:00",
        "airportCode": "ICN",
        "airportName": "Incheon Intl Arpt",
        "cityCode": "SEL",
        "cityName": "Seoul",
        "countryCode": "KR",
        "countryName": "Korea, Republic Of",
        "latitude": 37.469075,
        "longitude": 126.450517,
        "stateCode": "",
        "timeZone": "Asia/Seoul"
      },
      "finish": {
        "dateTime": "2017-09-01T23:31:00+02:00",
        "airportCode": "WAW",
        "airportName": "Warsaw Frederic Chopin Arpt",
        "cityCode": "WAW",
        "cityName": "Warsaw",
        "countryCode": "PL",
        "countryName": "Poland",
        "latitude": 52.16575,
        "longitude": 20.967122,
        "stateCode": "",
        "timeZone": "Europe/Warsaw"
      },
      "plane": {
        "code": "74H",
        "shortName": "Boeing 747-8",
        "fullName": "Boeing 747-8",
        "manufacturer": "Boeing",
        "model": "747-8 Intercontinental"
      },
      "distance": 7726,
      "durationMin": 579,
      "price": 671.49
    },
    {
      "key": "U1UzMDEgMTUwNDE5MTYwMDAwMA==",
      "airline": {
        "code": "SU",
        "name": "Aeroflot"
      },
      "flightNum": 301,
      "start": {
        "dateTime": "2017-09-01T06:15:00+09:00",
        "airportCode": "ICN",
        "airportName": "Incheon Intl Arpt",
        "cityCode": "SEL",
        "cityName": "Seoul",
        "countryCode": "KR",
        "countryName": "Korea, Republic Of",
        "latitude": 37.469075,
        "longitude": 126.450517,
        "stateCode": "",
        "timeZone": "Asia/Seoul"
      },
      "finish": {
        "dateTime": "2017-09-01T08:54:00+02:00",
        "airportCode": "WAW",
        "airportName": "Warsaw Frederic Chopin Arpt",
        "cityCode": "WAW",
        "cityName": "Warsaw",
        "countryCode": "PL",
        "countryName": "Poland",
        "latitude": 52.16575,
        "longitude": 20.967122,
        "stateCode": "",
        "timeZone": "Europe/Warsaw"
      },
      "plane": {
        "code": "74H",
        "shortName": "Boeing 747-8",
        "fullName": "Boeing 747-8",
        "manufacturer": "Boeing",
        "model": "747-8 Intercontinental"
      },
      "distance": 7726,
      "durationMin": 579,
      "price": 982.56
    },
    {
      "key": "U1U0MTggMTUwNDE5MTYwMDAwMA==",
      "airline": {
        "code": "SU",
        "name": "Aeroflot"
      },
      "flightNum": 418,
      "start": {
        "dateTime": "2017-09-01T20:50:00+09:00",
        "airportCode": "ICN",
        "airportName": "Incheon Intl Arpt",
        "cityCode": "SEL",
        "cityName": "Seoul",
        "countryCode": "KR",
        "countryName": "Korea, Republic Of",
        "latitude": 37.469075,
        "longitude": 126.450517,
        "stateCode": "",
        "timeZone": "Asia/Seoul"
      },
      "finish": {
        "dateTime": "2017-09-01T23:29:00+02:00",
        "airportCode": "WAW",
        "airportName": "Warsaw Frederic Chopin Arpt",
        "cityCode": "WAW",
        "cityName": "Warsaw",
        "countryCode": "PL",
        "countryName": "Poland",
        "latitude": 52.16575,
        "longitude": 20.967122,
        "stateCode": "",
        "timeZone": "Europe/Warsaw"
      },
      "plane": {
        "code": "74H",
        "shortName": "Boeing 747-8",
        "fullName": "Boeing 747-8",
        "manufacturer": "Boeing",
        "model": "747-8 Intercontinental"
      },
      "distance": 7726,
      "durationMin": 579,
      "price": 713.64
    },
    {
      "key": "U1UxMzYgMTUwNDE5MTYwMDAwMA==",
      "airline": {
        "code": "SU",
        "name": "Aeroflot"
      },
      "flightNum": 136,
      "start": {
        "dateTime": "2017-09-01T23:58:00+09:00",
        "airportCode": "ICN",
        "airportName": "Incheon Intl Arpt",
        "cityCode": "SEL",
        "cityName": "Seoul",
        "countryCode": "KR",
        "countryName": "Korea, Republic Of",
        "latitude": 37.469075,
        "longitude": 126.450517,
        "stateCode": "",
        "timeZone": "Asia/Seoul"
      },
      "finish": {
        "dateTime": "2017-09-02T02:37:00+02:00",
        "airportCode": "WAW",
        "airportName": "Warsaw Frederic Chopin Arpt",
        "cityCode": "WAW",
        "cityName": "Warsaw",
        "countryCode": "PL",
        "countryName": "Poland",
        "latitude": 52.16575,
        "longitude": 20.967122,
        "stateCode": "",
        "timeZone": "Europe/Warsaw"
      },
      "plane": {
        "code": "789",
        "shortName": "Boeing 787-9",
        "fullName": "Boeing 787-9 Dreamliner",
        "manufacturer": "Boeing",
        "model": "787-9"
      },
      "distance": 7726,
      "durationMin": 579,
      "price": 634.33
    },
    {
      "key": "U1U0NTcgMTUwNDE5MTYwMDAwMA==",
      "airline": {
        "code": "SU",
        "name": "Aeroflot"
      },
      "flightNum": 457,
      "start": {
        "dateTime": "2017-09-01T17:43:00+09:00",
        "airportCode": "ICN",
        "airportName": "Incheon Intl Arpt",
        "cityCode": "SEL",
        "cityName": "Seoul",
        "countryCode": "KR",
        "countryName": "Korea, Republic Of",
        "latitude": 37.469075,
        "longitude": 126.450517,
        "stateCode": "",
        "timeZone": "Asia/Seoul"
      },
      "finish": {
        "dateTime": "2017-09-01T20:22:00+02:00",
        "airportCode": "WAW",
        "airportName": "Warsaw Frederic Chopin Arpt",
        "cityCode": "WAW",
        "cityName": "Warsaw",
        "countryCode": "PL",
        "countryName": "Poland",
        "latitude": 52.16575,
        "longitude": 20.967122,
        "stateCode": "",
        "timeZone": "Europe/Warsaw"
      },
      "plane": {
        "code": "T95",
        "shortName": "TU-95",
        "fullName": "TU-95V",
        "manufacturer": "Tupolev",
        "model": "TU-95V"
      },
      "distance": 7726,
      "durationMin": 579,
      "price": 625.56
    },
    {
      "key": "U1U4MTMgMTUwNDE5MTYwMDAwMA==",
      "airline": {
        "code": "SU",
        "name": "Aeroflot"
      },
      "flightNum": 813,
      "start": {
        "dateTime": "2017-09-01T04:11:00+09:00",
        "airportCode": "ICN",
        "airportName": "Incheon Intl Arpt",
        "cityCode": "SEL",
        "cityName": "Seoul",
        "countryCode": "KR",
        "countryName": "Korea, Republic Of",
        "latitude": 37.469075,
        "longitude": 126.450517,
        "stateCode": "",
        "timeZone": "Asia/Seoul"
      },
      "finish": {
        "dateTime": "2017-09-01T06:50:00+02:00",
        "airportCode": "WAW",
        "airportName": "Warsaw Frederic Chopin Arpt",
        "cityCode": "WAW",
        "cityName": "Warsaw",
        "countryCode": "PL",
        "countryName": "Poland",
        "latitude": 52.16575,
        "longitude": 20.967122,
        "stateCode": "",
        "timeZone": "Europe/Warsaw"
      },
      "plane": {
        "code": "74H",
        "shortName": "Boeing 747-8",
        "fullName": "Boeing 747-8",
        "manufacturer": "Boeing",
        "model": "747-8 Intercontinental"
      },
      "distance": 7726,
      "durationMin": 579,
      "price": 645.63
    },
    {
      "key": "U1U4MjUgMTUwNDE5MTYwMDAwMA==",
      "airline": {
        "code": "SU",
        "name": "Aeroflot"
      },
      "flightNum": 825,
      "start": {
        "dateTime": "2017-09-01T09:22:00+09:00",
        "airportCode": "ICN",
        "airportName": "Incheon Intl Arpt",
        "cityCode": "SEL",
        "cityName": "Seoul",
        "countryCode": "KR",
        "countryName": "Korea, Republic Of",
        "latitude": 37.469075,
        "longitude": 126.450517,
        "stateCode": "",
        "timeZone": "Asia/Seoul"
      },
      "finish": {
        "dateTime": "2017-09-01T12:01:00+02:00",
        "airportCode": "WAW",
        "airportName": "Warsaw Frederic Chopin Arpt",
        "cityCode": "WAW",
        "cityName": "Warsaw",
        "countryCode": "PL",
        "countryName": "Poland",
        "latitude": 52.16575,
        "longitude": 20.967122,
        "stateCode": "",
        "timeZone": "Europe/Warsaw"
      },
      "plane": {
        "code": "74H",
        "shortName": "Boeing 747-8",
        "fullName": "Boeing 747-8",
        "manufacturer": "Boeing",
        "model": "747-8 Intercontinental"
      },
      "distance": 7726,
      "durationMin": 579,
      "price": 673.27
    },
    {
      "key": "U1U4MDYgMTUwNDE5MTYwMDAwMA==",
      "airline": {
        "code": "SU",
        "name": "Aeroflot"
      },
      "flightNum": 806,
      "start": {
        "dateTime": "2017-09-01T12:30:00+09:00",
        "airportCode": "ICN",
        "airportName": "Incheon Intl Arpt",
        "cityCode": "SEL",
        "cityName": "Seoul",
        "countryCode": "KR",
        "countryName": "Korea, Republic Of",
        "latitude": 37.469075,
        "longitude": 126.450517,
        "stateCode": "",
        "timeZone": "Asia/Seoul"
      },
      "finish": {
        "dateTime": "2017-09-01T15:09:00+02:00",
        "airportCode": "WAW",
        "airportName": "Warsaw Frederic Chopin Arpt",
        "cityCode": "WAW",
        "cityName": "Warsaw",
        "countryCode": "PL",
        "countryName": "Poland",
        "latitude": 52.16575,
        "longitude": 20.967122,
        "stateCode": "",
        "timeZone": "Europe/Warsaw"
      },
      "plane": {
        "code": "74H",
        "shortName": "Boeing 747-8",
        "fullName": "Boeing 747-8",
        "manufacturer": "Boeing",
        "model": "747-8 Intercontinental"
      },
      "distance": 7726,
      "durationMin": 579,
      "price": 633.61
    },
    {
      "key": "U1UxMzMgMTUwNDE5MTYwMDAwMA==",
      "airline": {
        "code": "SU",
        "name": "Aeroflot"
      },
      "flightNum": 133,
      "start": {
        "dateTime": "2017-09-01T22:56:00+09:00",
        "airportCode": "ICN",
        "airportName": "Incheon Intl Arpt",
        "cityCode": "SEL",
        "cityName": "Seoul",
        "countryCode": "KR",
        "countryName": "Korea, Republic Of",
        "latitude": 37.469075,
        "longitude": 126.450517,
        "stateCode": "",
        "timeZone": "Asia/Seoul"
      },
      "finish": {
        "dateTime": "2017-09-02T01:35:00+02:00",
        "airportCode": "WAW",
        "airportName": "Warsaw Frederic Chopin Arpt",
        "cityCode": "WAW",
        "cityName": "Warsaw",
        "countryCode": "PL",
        "countryName": "Poland",
        "latitude": 52.16575,
        "longitude": 20.967122,
        "stateCode": "",
        "timeZone": "Europe/Warsaw"
      },
      "plane": {
        "code": "333",
        "shortName": "Airbus A330-300",
        "fullName": "Airbus Industrie A330-300",
        "manufacturer": "Airbus",
        "model": "A330-300"
      },
      "distance": 7726,
      "durationMin": 579,
      "price": 639.18
    }
  ];
}