'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (startIndex, mainIndex) {
    return [this.starterMenu[startIndex], this.mainMenu[mainIndex]];
  },

  // Destructuring object in a function param
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]}
    will be delivered to ${address} at ${time}`);
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is you delicious pasta with: ${ing1}, ${ing2}, ${ing3}`);
  },

  // REST
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(...otherIngredients); // SPREAD
    console.log(otherIngredients); // empty arr if nothing is passed as second parameter
  },
};

/* --------------------------------------------- */
// const arr = [2, 3, 4];

// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// // Array destructuring
// const [x, y, z] = arr;
// console.log(x, y, z);
// console.log(arr);

// // this will skip the 'actual' second in the array
// let [first, , second] = restaurant.categories;
// console.log(first, second);

// // Switching variables position
// // const temp = first;
// // first = second;
// // second = temp;
// console.log(first, second);
// [first, second] = [second, first];
// console.log(first, second);

// // Return 2 values from a function
// const [starter, main] = restaurant.order(2, 0);
// console.log(starter, main);

// // Nested destructuring
// const nested = [2, 4, [5, 6]];
// // const [i, , j] = nested;
// // console.log(i, j);
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// // Default Values
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);
/* --------------------------------------------- */

// Object destructuring
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// // Renaming properties
// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);

// // Default values
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// // Mutating variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };
// ({ a, b } = obj); // rewrite first two values
// console.log(a, b);

// // Nested Objects
// const {
//   fri: { open: o = 1, close: c = 1 },
// } = openingHours;
// console.log(o, c);

// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del Sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// restaurant.orderDelivery({
//   address: 'Via del Sole, 21',
//   starterIndex: 1,
// });
/* --------------------------------------------- */

// The Spread Operator
// const arr = [7, 8, 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);

// const newGoodArr = [1, 2, ...arr];
// console.log(newGoodArr);
// console.log(...newGoodArr);

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// // Copy array
// const mainMenuCopy = [...restaurant.mainMenu];
// console.log(mainMenuCopy);

// // Join 2 arrays
// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(menu);
// const concatMenu = restaurant.mainMenu.concat(restaurant.starterMenu);
// console.log(concatMenu);

// // Iterables: arrays, strings, maps, sets. NOT objects

// const str = 'Jonas';
// const letters = [...str, ' ', 'S.'];
// console.log(letters);
// console.log(...str);

// // Real world example
// // const ingredients = [
// //   prompt("Lets's make pasta! Ing 1"),
// //   prompt("Lets's make pasta! Ing 2"),
// //   prompt("Lets's make pasta! Ing 3"),
// // ];
// // console.log(ingredients);
// // restaurant.orderPasta(...ingredients);

// // Objects
// const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiuseppe' };
// console.log(newRestaurant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristorante Roma';
// console.log(restaurantCopy.name);
// console.log(restaurant.name);

/* --------------------------------------------- */

// Rest(literally) Pattern and Parameters

// 1) Destructuring
// SPREAD, because on RIGHT side of '='
// const arr = [1, 2, ...[3, 4]];

// // REST, because of LEFT side of '='
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherFood);

// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(sat, weekdays);
// //////////////////////////////

// // 2) Functions Rest Parameters
// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     sum += numbers[i];
//   }

//   console.log(sum);
// };
// // will become array doing the opposite of Spread
// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 2, 5, 3, 2, 1, 4);

// const x = [23, 5, 7];
// add(...x); // will SPREAD here, and be REST inside the function

// restaurant.orderPizza('mushrooms', 'onions', 'olives', 'spinach');
// restaurant.orderPizza('mushrooms');

/* --------------------------------------------- */

// Short Circuiting(&& and ||)

// console.log('--- OR ---'); // RETURNS the first true value
// // Use ANY data type, return ANY data type, short circuiting
// console.log(3 || 'Jonas');
// console.log('' || 'Jonas');
// console.log(true || 0);
// console.log(undefined || null);

// console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// restaurant.numGuests = 23; // won't work if it is 0
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);
// console.log('--- OR ---');

// console.log('--- AND ---'); // RETURNS the first false value
// console.log(0 && 'Jonas');
// console.log(7 && 'Jonas');

// console.log('Hello' && 23 && null && 'Jonas');

// // both work the same way
// if(restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach');
// }
// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// console.log('--- AND ---');

/* --------------------------------------------- */

// The Nullish Coalescing Operator(??)

// this won't work
// restaurant.numGuests = 0;
// const guests = restaurant.numGuests || 10;
// console.log(guests);

// // this one works correctly, Nullish: null and undefined (NOT 0 or '')
// const guestsCorrect = restaurant?.numGuests ?? 10; // only in null or undefined it would fall to '10'
// console.log(guestsCorrect);

/* --------------------------------------------- */

// Logical Assignment Operators

// const rest1 = {
//   name: 'Capri',
//   // numGuests: 20,
//   numGuests: 0, // this will make the logical operator fail
// };

// const rest2 = {
//   name: 'La Pizza',
//   owner: 'Giovanni Rossi',
// };

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// console.log(rest1);
// console.log(rest2);

// same as above, but short, OR assignment operator
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;
// console.log(rest1);
// console.log(rest2);

// Nullish assign operator
// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

// // rest2.owner = rest2.owner && '<ANONYMOUS>';
// // rest1.owner = rest1.owner && '<ANONYMOUS>';

// // AND assignment operator
// rest1.owner &&= 'ANONYMOUS';
// rest2.owner &&= 'ANONYMOUS';

// console.log(rest1);
// console.log(rest2);

/* --------------------------------------------- */

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. 
For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, 
and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, 
along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

// 1
const [players1, players2] = game.players; // Arr destructuring
// console.log(players1, players2);

// 2
const [goalkeeper1, ...fieldPlayers1] = players1; // REST
const [goalkeeper2, ...fieldPlayers12] = players2;
// console.log(goalkeeper1, fieldPlayers1);

// 3
const allPlayers = [...players1, ...players2]; // SPREAD
// console.log(allPlayers);

// 4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic']; // SPREAD
// console.log(players1Final);

// 5
const { team1, x: draw, team2 } = game.odds; // Object destructuring
// console.log(team1, draw, team2);

// 6
function printGoals(...playerNames) {
  console.log(`${playerNames} scored ${playerNames.length}`);
}
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich'); // REST, became an array in function
printGoals(game.scored); // SPREAD Became a single String

// 7
console.log(
  (game.odds.team1 < game.odds.team2 && game.team1) ||
    (game.odds.team2 < game.odds.team1 && game.team2)
); // Circuit
