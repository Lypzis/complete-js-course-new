'use strict';

/*  this code is for showing how scoping works */
// function calcAge(birthYear) {
//   const age = 2037 - birthYear;

//   function printAge() {
//     // this will use the global scope firstName
//     let output = `${firstName}, you are ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var millenial = true;
//       const firstName = 'Steven'; // this will be used in this block scope
//       const str = `Oh, and you're a millenial, ${firstName}`;
//       console.log(str);

//       function add(a, b) {
//         return a + b;
//       }

//       // redefined
//       output = 'NEW OUTPUT!';

//       // new variable, won't log outside as 'output'
//       //  const output = 'NEW OUTPUT!';
//     }
//     // console.log(str);
//     console.log(millenial);
//     // add(2, 3);
//     console.log(output);
//   }

//   printAge();

//   return age;
// }

// const firstName = 'John';

// calcAge(1991);
// /* -------------------------------------- */

// /* Hoisting and TDZ */
// console.log(me); // undefined
// // console.log(job); // cannot be accessed before initialization
// // console.log(year); // cannot be accessed before initialization

// var me = 'Jonas';
// let job = 'teacher';
// const year = 1991;

// console.log(addDecl(2, 3));
// // console.log(addExpr(2, 3)); // cannot be accessed before initialization
// // console.log(addArrow(2, 3)); // cannot be accessed before initialization

// function addDecl(a, b) {
//   return a + b;
// }

// const addExpr = function (a, b) {
//   return a + b;
// };

// const addArrow = (a, b) => a + b;

// // Example
// if (!numProducts) deleteShoppingCart(); // numProducts is undefined, unintentionally running this function...

// var numProducts = 10;

// function deleteShoppingCart() {
//   console.log('All products deleted!');
// }
/* -------------------------------------- */

/* The 'this' keyword */
// console.log(this);

// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this);
// };
// calcAge(1991);

// const calcAgeArrow = birthYear => {
//   console.log(2037 - birthYear);
//   console.log(this);
// };
// calcAgeArrow(1980);

// const jonas = {
//   year: 1991,
//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);
//   },
// };
// jonas.calcAge();

// const matilda = {
//   year: 2017,
// };

// matilda.calcAge = jonas.calcAge; // method borrowing
// matilda.calcAge();

// const f = jonas.calcAge; // 'this' will be undefined here
// f();
/* -------------------------------------- */

/* Regular Functions vs Arrow Functions */
// var firstName = 'Matilda'; // the bellow is undefined unless this 'var' is declared here

// const jonas = {
//   firstName: 'Jonas',
//   year: 1991,
//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);

//     // Solution 1
//     // will solve problem in function isMillenial (in es5)
//     // const self = this;

//     // const isMillenial = function () {
//     //   // 'this' will be undefined here
//     //   //   console.log(this.year >= 1981 && this.year <= 1996);
//     //   console.log(self.year >= 1981 && self.year <= 1996);
//     // };

//     // Solution 2
//     // will work because arrow function has no 'this'
//     // so it will use 'this' from the parent scope
//     const isMillenial = () => {
//       // 'this' will be undefined here
//       //   console.log(this.year >= 1981 && this.year <= 1996);
//       console.log(this.year >= 1981 && this.year <= 1996);
//     };
//     isMillenial();
//   },
//   // never use arrow function as a method!
//   greet: () => console.log(`Hey ${this.firstName}`),
// };

// jonas.greet(); // firstName will be undefined
// console.log(this.firstName); // undefined too, as it is not in window object also

// jonas.calcAge();

// const addExpr = function (a, b) {
//   console.log(arguments); // list of parameters, only exists in regular functions
//   return a + b;
// };

// addExpr(2, 5);

// var addArrow = (a, b) => {
//     console.log(arguments); // arguments not defined
//     a + b};
/* -------------------------------------- */

/* Primitive Vs Objects(Reference Types) */

let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';

console.log(lastName, oldLastName);

const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = jessica; // only the reference is being copied here, same object
marriedJessica.lastName = 'Davis';

console.log('Before marriage', jessica);
console.log('After marriage', marriedJessica);

// NOTE: a shallow copy only copies the properties of the first level of the object
// a deep clone would need an external library
// const marriedJessicaFixed = Object.assign({}, jessica); // this assign a new object with the same properties, a shallow copy
const marriedJessicaFixed = { ...jessica }; // this assign a new object with the same properties, a shallow copy
marriedJessicaFixed.lastName = 'Smith';
console.log('After marriage(fix)', marriedJessicaFixed);

/* -------------------------------------- */
