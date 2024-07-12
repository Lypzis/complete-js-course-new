'use strict'; // "secure" code mode, will show errors otherwise silent to the console

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log('I can drive :D');

function logger() {
  console.log('My name is Victor');
}

logger();

// Function declaration (can be accessed before initialization)
function calcAge(birthYear) {
  return 2037 - birthYear;
}

// Function expression (can be accessed only after the declaration)
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};

// Simple arrow function
const calcAge3 = birthYear => 2037 - birthYear;

const yearsUntilRetirement = birthYear => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;

  return retirement;
};

function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  return `Juice with ${applePieces} apples and ${orangePieces} oranges.`;
}

const person = {
  firstName: 'Jonas',
  lastName: 'Schmedtmann',
  birthYear: 1991,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven'],
  /* calcAge: function (birthYear) {
    return 2037 - birthYear;
  }, */
  calcAge: function () {
    return 2037 - this.birthYear;
  },
};

const age = person.age;
const job = person['job'];
const { firstName, lastName } = person;

const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};

/* Write your code below. Good luck! 🙂 */

const calcAverage = arr => {
  const initialValue = 0;
  const sum = arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  return sum / arr.length;
};

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

const tips = [];

const totals = [];

for (let i = 0; i < bills.length; i++) {
  const tip = calcTip(bills[i]);

  tips.push(tip);

  totals.push(bills[i] + tip);
}

console.log(tips);
console.log(totals);
console.log(calcAverage(totals));

const printForecast = arr => {
  let stringRes = '';

  arr.forEach((value, index) => {
    if (typeof value === 'number') {
      // if 0
      if (!index) stringRes += '... ';

      stringRes += `${value}ºC in ${index + 1} days ... `;
    }
  });

  // if empty, no forecasts
  stringRes ? console.log(stringRes) : console.log('No Forecasts :(');
};
