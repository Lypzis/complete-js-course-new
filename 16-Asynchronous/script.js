'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const url = 'https://restcountries.com/v3.1';

///////////////////////////////////////

/* ---------------------------------------------------------- */

// AJAX Call: XMLHttpRequest / Old school

const renderCountry = (data, className = '') => {
  const languages = Object.values(data.languages);
  const [currency] = Object.values(data.currencies);

  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" alt="${
    data.flags.alt
  }" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}M people</p>
        <p class="country__row"><span>🗣️</span>${languages.join('\n')}</p>
        <p class="country__row"><span>💰</span>${currency.name}</p>
      </div>
    </article>
`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  //   countriesContainer.style.opacity = 1;
};

const renderError = msg => {
  countriesContainer.insertAdjacentText('beforeend', msg);

  //   countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = country => {
//   const request = new XMLHttpRequest(); // no one uses this anymore, unless in legacy code
//   request.open('GET', `${url}/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     // Render Country 1
//     renderCountry(data);

//     // Get neighbour country (2)
//     const [neighbour] = data?.borders;

//     if (!neighbour) return;

//     const request2 = new XMLHttpRequest(); // no one uses this anymore, unless in legacy code
//     request2.open('GET', `${url}/alpha/${neighbour}`);
//     request2.send();

//     // callback hell :D
//     request2.addEventListener('load', function () {
//       const [data] = JSON.parse(this.responseText);

//       console.log(data);
//       renderCountry(data, 'neighbour');
//     });
//   });
// };

// // getCountryAndNeighbour('portugal');
// // getCountryAndNeighbour('usa');
// getCountryAndNeighbour('thailand');

/* ---------------------------------------------------------- */

// Promises and fetch API

// const request = fetch(url + '/name/portugal');

// console.log(request);

/* ---------------------------------------------------------- */

// Consuming Promises

// // this approach gets rid of callback hell problems
// const getCountryData = country => {
//   // thsi Promise returns a Promise
//   fetch(`${url}/name/${country}`)
//     .then(res => {
//       // console.log(res);

//       // if this error happens, that custom message will show at catch
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);

//       return res.json(); // json() is async as well :D
//     })
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbour = data[0]?.borders[0];

//       return fetch(`${url}/alpha/${neighbour}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Neighbour not found (${res.status})`);

//       return res.json();
//     })
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.log(err);

//       // gets here if an error occurs, rejected
//       renderError(`Something went wrong D: ${err.message}, try again!`);
//     })
//     // this is called no matter if the promise is fulfillled or rejected
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// helper function to get json data, or return a nice error
// to be used in Promises
const getJSON = (fullUrl, errorMsg = 'Something went wrong') =>
  fetch(fullUrl).then(res => {
    // if this error happens, that custom message will show at catch
    if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);

    return res.json(); // json() is async as well :D
  });

// this approach gets rid of callback hell problems
const getCountryData = country => {
  getJSON(`${url}/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0]?.borders?.at(0);

      if (!neighbour) throw new Error('This country has no neighbours!');

      return getJSON(`${url}/alpha/${neighbour}`, 'Neighbour not found');
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.log(err);

      // gets here if an error occurs, rejected
      renderError(`Something went wrong D: ${err.message}, try again!`);
    })
    // this is called no matter if the promise is fulfillled or rejected
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', () => {
  getCountryData('australia');
});

/* ---------------------------------------------------------- */

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. 
For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// const whereAmI = (lat, lng) => {
//   const geoUrl = `https://geocode.xyz/${lat},${lng}?geoit=json`; // &auth=your_api_key

//   fetch(geoUrl)
//     .then(res => {
//       if (!res.ok) throw new Error(`Something went wrong! (${res.status})`);

//       return res.json();
//     })
//     .then(data => {
//       if (!data.country)
//         throw new Error(`You passed the maximum amount of requests!`);

//       console.log(`You are in ${data.region}, ${data.country}`);

//       //   getCountryData(data.country.toLowerCase());
//       return getJSON(
//         `${url}/name/${data.country.toLowerCase()}`,
//         'Country not found'
//       );
//     })
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbour = data[0]?.borders?.at(0);

//       if (!neighbour) throw new Error('This country has no neighbours!');

//       return getJSON(`${url}/alpha/${neighbour}`, 'Neighbour not found');
//     })
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.log(err);

//       // gets here if an error occurs, rejected
//       renderError(`Something went wrong D: ${err.message}, try again!`);
//     })
//     // this is called no matter if the promise is fulfillled or rejected
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// whereAmI(-33.933, 18.474);

/* ---------------------------------------------------------- */

// The Event Loop in practice

// console.log('Test start'); // high level functions execute first

// setTimeout(() => console.log('0 sec timer'), 0); // this will log at the end

// Promise.resolve('Resolved promise 1').then(res => console.log(res)); // microtask has priority over callback

// // only after this the setTimeout callback will execute :D
// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}

//   console.log(res);
// });

// console.log('Test end');

/* ---------------------------------------------------------- */

// Building a Simple Promise

const lotteryPromise = new Promise((resolve, reject) => {
  console.log('Lottery draw is happening!');

  setTimeout(() => {
    if (Math.random() >= 0.5) resolve('You win!');
    // fulfilled promise, the value passed is available to the .then method
    else reject(new Error('You lost your money!')); // rejected, which means, goes to .catch as failed
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// Promisifying setTimeout
const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(3)
  .then(() => {
    console.log('I waited for 3 seconds!');
    return wait(1); // wait 1 more second
  })
  .then(() => console.log('I waited for 1 second'));

// static method in Promise
Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('abc')).catch(x => console.log(x));
/* ---------------------------------------------------------- */
