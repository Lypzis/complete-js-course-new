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
  countriesContainer.style.opacity = 1;
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

// btn.addEventListener('click', () => {
//   getCountryData('australia');
// });

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

// const lotteryPromise = new Promise((resolve, reject) => {
//   console.log('Lottery draw is happening!');

//   setTimeout(() => {
//     if (Math.random() >= 0.5) resolve('You win!');
//     // fulfilled promise, the value passed is available to the .then method
//     else reject(new Error('You lost your money!')); // rejected, which means, goes to .catch as failed
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// // Promisifying setTimeout
// const wait = seconds => {
//   return new Promise(resolve => {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(3)
//   .then(() => {
//     console.log('I waited for 3 seconds!');
//     return wait(1); // wait 1 more second
//   })
//   .then(() => console.log('I waited for 1 second'));

// // static method in Promise
// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('abc')).catch(x => console.log(x));

/* ---------------------------------------------------------- */

// Promisifying the Geolocation API

// navigator.geolocation.getCurrentPosition();

console.log('Getting Position');

// const getPositon = () =>
//   new Promise((resolve, reject) => {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );

//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });

// getPositon().then(pos => console.log(pos));

// const whereAmI = () => {
//   getPositon()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
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
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', whereAmI);

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. 
This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. 
When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. 
The fulfilled value should be the image element itself. 
In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), 
and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀

*/

// const wait = seconds => {
//   return new Promise(resolve => {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// // 1
// const createImage = imgPath =>
//   new Promise((resolve, reject) => {
//     const img = document.createElement('img');
//     const images = document.querySelector('.images');
//     img.src = imgPath;

//     img.addEventListener('load', () => {
//       images.insertAdjacentElement('beforeend', img);

//       resolve(img);
//     });

//     img.addEventListener('error', e => {
//       reject(new Error('error ' + e.message));
//     });
//   });

// let imgEl;

// // 2
// createImage('./img/img-3.jpg')
//   .then(img => {
//     imgEl = img;

//     // 3
//     return wait(2);
//   })
//   .then(() => {
//     // 4
//     imgEl.style.display = 'none';

//     return createImage('./img/img-2.jpg');
//   })
//   .then(img => {
//     imgEl = img;

//     // 5
//     return wait(2);
//   })
//   // 6
//   .then(() => (imgEl.style.display = 'none'))
//   .catch(err => console.log(err));

/* ---------------------------------------------------------- */

// Consuming Promises with Async/Await

const getPositon = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

const whereAmI = async () => {
  try {
    const pos = await getPositon();

    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse Geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    const dataGeo = await resGeo.json();

    if (dataGeo.country === 'Throttled! See geocode.xyz/pricing' || !resGeo.ok)
      throw new Error('Failed to load Reverse Geocoding!');

    // Country Data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo?.country?.toLowerCase()}`
    );

    if (!res.ok) throw new Error('Failed to load Country!');

    const [dataCountry] = await res.json();

    renderCountry(dataCountry);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    alert(err.message);

    // Reject promise returned from async function
    throw err;
  }
};

console.log('1: Will get location');
// const city =  whereAmI();
// console.log(city);

// one of the last cases to use ifee these days
// (async () => {
//   try {
//     const city = await whereAmI();
//     console.log('2: ' + city);
//   } catch (err) {
//     console.log('2: ' + err.message);
//   } finally {
//     console.log('3: Finished getting location');
//   }
// })();

/* ---------------------------------------------------------- */

// Returning promises in parallel

const get3Countries = async (c1, c2, c3) => {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.3/name/${c3}`);

    // if one promise rejects, all of them fail
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      //   getJSON(`https://restcountries.com/v3.2/name/${c2}`), // this api is garbage so it will not load them 3, only the first
      //   getJSON(`https://restcountries.com/v3.3/name/${c3}`),
    ]);

    console.log(data.map(country => country.at(0).capital));

    // console.log([data1.capital, data2.capital, data3.capital]);
  } catch (error) {
    console.log(error);
  }
};

// get3Countries('portugal', 'canada', 'tanzania');

/* ---------------------------------------------------------- */

// Other Promise Combinators: race, allSettled and any

// Promise.race
// (async () => {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//     getJSON(`https://restcountries.com/v3.2/name/egypt`), // this api is garbage so it will not load them 3, only the first
//     getJSON(`https://restcountries.com/v3.3/name/mexico`),
//   ]);

//   console.log(res[0]);
// })();

// const timeout = sec => {
//   return new Promise((_, reject) => {
//     setTimeout(() => {
//       reject(new Error('Request took too long!'));
//     }, sec);
//   });
// };

// if at least one promise resolves, it will resolve or fail if at least one promise failed
// Promise.race([
//   getJSON(`https://restcountries.com/v3.1/name/tanzania`),
//   timeout(1),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.log(err));

// // Promise.allSettled - this will return all the result, whenever an error occured
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res));
// //   .catch(err => console.log(err)); // this will never return error, so catch won't work

// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.log(err)); // this will entirely fail because of a rejection

// // Promise.any
// Promise.any([
//   Promise.resolve('Success'), // resolved here
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'), // unreacheable
// ])
//   .then(res => console.log(res))
//   .catch(err => console.log(err)); // this will only reject if all failed

/* ---------------------------------------------------------- */

// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

let imgEl;

const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = imgPath =>
  new Promise((resolve, reject) => {
    const img = document.createElement('img');
    const images = document.querySelector('.images');
    img.src = imgPath;

    img.addEventListener('load', () => {
      images.insertAdjacentElement('beforeend', img);

      resolve(img);
    });

    img.addEventListener('error', e => {
      reject(new Error('error ' + e.message));
    });
  });

const loadNPause = async () => {
  try {
    imgEl = await createImage('./img/img-3.jpg');
    await wait(2);
    imgEl.style.display = 'none';

    imgEl = await createImage('./img/img-2.jpg');
    await wait(2);
    imgEl.style.display = 'none';
  } catch (error) {
    console.log(error);
  }
};

const loadAll = async (imgArr = []) => {
  try {
    const imgEls = imgArr.map(async path => await createImage(path));

    const imgElsResolved = await Promise.all(imgEls);

    imgElsResolved.forEach(imgEl => imgEl.classList.add('paralell'));
  } catch (error) {
    console.log(error);
  }
};

loadAll(['./img/img-3.jpg', './img/img-2.jpg', './img/img-1.jpg']);

/* ---------------------------------------------------------- */
