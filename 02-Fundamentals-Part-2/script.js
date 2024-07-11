"use strict"; // "secure" code mode, will show errors otherwise silent to the console

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("I can drive :D");

function logger() {
  console.log("My name is Victor");
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
const calcAge3 = (birthYear) => 2037 - birthYear;

const yearsUntilRetirement = (birthYear) => {
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
  firstName: "Jonas",
  lastName: "Schmedtmann",
  birthYear: 1991,
  job: "teacher",
  friends: ["Michael", "Peter", "Steven"],
  /* calcAge: function (birthYear) {
    return 2037 - birthYear;
  }, */
  calcAge: function () {
    return 2037 - this.birthYear;
  },
};

const age = person.age;
const job = person["job"];
const { firstName, lastName } = person;
