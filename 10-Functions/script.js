'use strict';

// const bookings = [];

// // Default Parameters
// const createBooking = (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) => {
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };

//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('LH123', 2);
// createBooking('LH123', 5);

// createBooking('LH123', undefined, 1000);

/* ----------------------------------- */

// Passing Arguments: Value vs. Reference
// const flight = 'LH234';

// const jonas = {
//   name: 'Jonas Schmedtmann',
//   passport: 2345664646,
// };

// const checkIn = (flightNum, passenger) => {
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 2345664646) {
//     alert('Checked in');
//   } else {
//     alert('Wrong passport !');
//   }
// };

// // checkIn(flight, { ...jonas }); // this solves the following problem...
// // checkIn(flight, jonas);
// // console.log(flight); // this won't change
// // console.log(jonas); // this will change :(

// const newPassport = person => {
//   person.passport = Math.trunc(Math.random() * 10000000000000);
// };

// newPassport(jonas); // will change the original object passport
// checkIn(flight, jonas);

/* ----------------------------------- */

// Functions Accepting Callback Functions

// const oneWord = str => {
//   return str.replace(/ /g, '').toLowerCase(); // removes all spaces
// };

// const upperFirstWord = str => {
//   const [first, ...others] = str.split(' '); // Get first word by destructuring and the rest of words

//   return [first.toUpperCase(), ...others].join(' '); // join first word uppercased to the rest of words
// };

// // High Order function - Abstraction
// const transformer = (str, fn) => {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`); // secondary functions
//   console.log(`Transformed by: ${fn.name}`);
//   //   return fn(str);
// };

// // the function will be called inside the function, CALLBACK FUNCTIONS
// transformer('Javascript is the best!', upperFirstWord);
// transformer('Javascript is the best!', oneWord);

// // CALLBACK - functions that call other functions, basically :D
// const high5 = () => {
//   console.log('HighFive!');
// };

// document.body.addEventListener('click', high5);

// ['Jonas', 'Martha', 'Adam'].forEach(high5);

// Exercise
// const double = num => num * 2;

// const square = num => num * num;

// const negate = num => num * -1;

// // HOF
// const transformArray = (arr, fn) => {
//   const transformedArray = [];

//   for (const item of arr) {
//     transformedArray.push(fn(item));
//   }

//   return transformedArray;
// };

// const numbers = [1, 2, 3, 4, 5];

// const doubledNUmbers = transformArray(numbers, double);
// console.log(doubledNUmbers);

// const squaredNumbers = transformArray(numbers, square);
// console.log(squaredNumbers);

// const negatedNumbers = transformArray(numbers, negate);
// console.log(negatedNumbers);

// const isOddNumber = num => num % 2 !== 0;

// // HOF
// const filterArray = (arr, fn) => {
//   const passedElements = [];

//   for (const item of arr) {
//     if (fn(item)) passedElements.push(item);
//   }

//   return passedElements;
// };

// const oddNumbers = filterArray(numbers, isOddNumber);
// console.log(oddNumbers);

// Exercise 2
// const stringsArr = [
//   'javascript is the best language',
//   'learning callbacks is fun',
//   "can't wait to perform the test",
// ];

// // Mapping Strings
// const capitalizeWord = word => {
//   const [firstLetter, ...otherLetters] = word;

//   return [firstLetter.toUpperCase(), ...otherLetters].join('');
// };
// // const capitalizeWord = word => `${word[0].toUpperCase()}${word.slice(1)}`;

// const capitalizeWords = arr => {
//   const words = [];

//   for (const word of arr.split(' ')) {
//     words.push(capitalizeWord(word));
//   }

//   return words.join(' ');
// };
// // const capitalizeWords = str => str.split(' ').map(capitalizeWord).join(' ');

// const transformArrayStrings = (arr, fn) => {
//   const transformedArrayStrings = [];

//   for (const item of arr) {
//     transformedArrayStrings.push(fn(item));
//   }

//   return transformedArrayStrings;
// };
// // const transformArrayStrings = (arr, fn) => arr.map(fn);

// const transformedStringArr = transformArrayStrings(stringsArr, capitalizeWords);
// console.log(transformedStringArr);

// // Reducing Arrays
// const stringAccumulator = (acc, str) => (acc += str.replaceAll(' ', ''));

// const reduceArray = (arr, fn) => {
//   let word = '';

//   for (const item of arr) {
//     word = fn(word, item);
//   }

//   return [word];
// };
// // const reduceArray = (arr, fn, initialValue) => arr.reduce(fn, initialValue);

// const reducedArray = reduceArray(stringsArr, stringAccumulator);
// // const reducedArray = reduceArray(stringsArr, stringAccumulator, '');
// console.log(reducedArray);

// // Sorting Arrays
// const compareByLength = (a, b) => a.length - b.length;

// const sortArray = (arr, comparator) => arr.slice().sort(comparator);

// // Example usage
// const sortedByLength = sortArray(stringsArr, compareByLength);
// console.log(sortedByLength);

/* ----------------------------------- */

// Functions Returning Functions

// this work because of closures
// const greet = greeting => name => console.log(`${greeting} ${name}`);

// // `greet` is a function that takes a `greeting` and returns another function
// // that takes a `name` and logs the greeting with the name.

// const greeterHey = greet('Hey');
// // `greet('Hey')` returns a function that takes a `name` and logs "Hey name"
// // `greeterHey` is now this inner function with `greeting` fixed to "Hey"

// greeterHey('Jonas'); // Outputs: "Hey Jonas"
// // When calling `greeterHey('Jonas')`, it logs "Hey Jonas"

// greeterHey('Steven'); // Outputs: "Hey Steven"
// // When calling `greeterHey('Steven')`, it logs "Hey Steven"

// greet('Hi'); // Nothing happens here because the returned function is not called

// greet('Hi')('Victor'); // Outputs: "Hi Victor"
// // `greet('Hi')` returns a function that takes a `name` and logs "Hi name"
// // When calling this returned function with 'Victor', it logs "Hi Victor"

/* ----------------------------------- */

// The call and apply methods

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };

// lufthansa.book(239, 'Jonas Schmedtmann');
// lufthansa.book(653, 'John Smith');
// console.log(lufthansa);

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const { book } = lufthansa; // store function into a variable

// // Does NOT work
// // book(23, 'Sarah Williams'); // will fail as it is now a separate function which is not part of the object anymore

// // Call Method
// // first param of call will be the 'this' used in the function
// book.call(eurowings, 23, 'Sarah Williams');
// console.log(eurowings);

// book.call(lufthansa, 239, 'Mary Cooper');
// console.log(lufthansa);

// const swiss = {
//   airline: 'Swiss Airlines',
//   iataCode: 'LX',
//   bookings: [],
// };

// book.call(swiss, 583, 'Mary Cooper');

// // Apply Method - this is not so used anymore, thanks to spread operator
// const flightData = [583, 'George Cooper'];
// book.apply(swiss, flightData);
// console.log(swiss);

// book.call(swiss, ...flightData); // does the same as 'apply' above

// // The Bind Method

// const bookEW = book.bind(eurowings); // book is binded to object eurowings :D
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);
// bookEW(23, 'Steven Williams');

// // partial application, parts are already predefined
// const bookEW23 = book.bind(eurowings, 23); // a default parameter to 23, the first argument 'flightNum'

// bookEW23('Jonas Schmedtmann');
// bookEW23('Martha Cooper');

// // With Event Listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.planes++;
//   console.log(this.planes);
// };

// // better for memory, more verbose - this applies to clean and maintenable code principles
// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// less verbose, but will impact memory, as each event creates a new function
// document
//   .querySelector('.buy')
//   .addEventListener('click', () => lufthansa.buyPlane());

// Partial application
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// // this is not used in addTax, so it can be set to null
// // after this, the 'rate' is preset to .23
// const addVAT = addTax.bind(null, 0.23); // a "new" function

// console.log(addVAT(100));
// console.log(addVAT(23));

// Challenge
// const addTax = rate => value => value + value * rate;

// const addVAT = addTax.bind(null, 0.5); // preset rate

// // here you can do addVAT without rate, as it was preset, and then pass the parameter 'value' to execute it
// console.log(addVAT()(100));
// console.log(addTax(0.25)(100));

// const addVAT2 = addTax(0.3); // izi
// console.log(addVAT2(100));
// console.log(addVAT2(23));

/* ----------------------------------- */

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section 😃
//   answers: new Array(4).fill(0),

//   registerNewAnswer() {
//     const promptQuestion = this.options.reduce(
//       (acc, option) => acc + `${option}\n`,
//       `${this.question}\n`
//     );

//     const selectedOption = Number(prompt(promptQuestion));

//     if (
//       typeof selectedOption === 'number' &&
//       selectedOption >= 0 &&
//       selectedOption <= 3
//     ) {
//       this.answers[selectedOption]++;
//     } else alert('Please insert a value between 0 and 3!');
//   },
//   displayResults(type = 'array') {
//     const pollResult =
//       type === 'string'
//         ? `Poll results are ${[...this.answers]}`
//         : this.answers;

//     console.log(pollResult);
//   },

//   runPoll(type = 'array') {
//     this.registerNewAnswer();
//     this.displayResults(type);
//   },
// };

// // 4
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.runPoll.bind(poll, 'string'));

// // BONUS
// const customDisplay = poll.displayResults;

// customDisplay.call({ answers: [5, 2, 3] }, 'string');
// customDisplay.call({ answers: [1, 5, 3, 9, 6, 1] });

/* ----------------------------------- */

// Immediately Invoked Function Expressions (IIFE) - Not very popular anymore

// const runOnce = () => console.log('This can be run again.');
// runOnce(); // this can be run again any time :(

// // now this will run only ONCE
// (function () {
//   console.log('This will never run again :D');
//   const isPrivate = true; // this is only accessible here
// })();

// // console.log(isPrivate); // this won't work because of the scope

// (() => console.log('This will never run again :D'))();

/* ----------------------------------- */

// Closures

// const secureBooking = () => {
//   let passengerCount = 0;

//   // this 'child' function has access to its parent variables
//   return () => {
//     passengerCount++;
//     console.log(`${passengerCount} passengers`);
//   };
// };

// // booker is the function returned from execution
// const booker = secureBooking(); // the function secureBooking has already finished its execution

// // here only the returned function is running, so it will increment 'passengerCount', which is part of its scope
// booker();
// booker();
// booker();

// console.dir(booker);

// // Example 1
// let f;

// const g = () => {
//   const a = 23;

//   f = () => {
//     console.log(a * 2);
//   };
// };

// const h = () => {
//   const b = 777;

//   f = () => {
//     console.log(b * 2);
//   };
// };

// g();
// f();

// // Reassign 'f' function
// h();
// f();

// console.dir(f);

// Example 2

// const boardPassengers = (n, seconds) => {
//   const perGroup = n / 3;

//   // closure, will use the "closest" scope variables
//   setTimeout(() => {
//     console.log(`Will are now boarding all ${n} passengers`);

//     console.log(`There are 3 groups, each with ${perGroup} passengers`);
//   }, seconds * 1000); // will execute after a given time in milliseconds

//   console.log(`Will start boarding in ${seconds} seconds`);
// };

// const perGroup = 1000;

// boardPassengers(180, 3);

/* ----------------------------------- */

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, 
attach an event listener that changes the color of the selected h1 element ('header') to blue, 
each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. 
Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

let header;

(() => {
  header = document.querySelector('h1');
  header.style.color = 'red';
})();

document.querySelector('body').addEventListener('click', () => {
  header.style.color = 'blue';
});

/* ----------------------------------- */
