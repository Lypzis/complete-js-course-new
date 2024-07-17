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

  order(startIndex, mainIndex) {
    return [this.starterMenu[startIndex], this.mainMenu[mainIndex]];
  },

  // Destructuring object in a function param
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]}
    will be delivered to ${address} at ${time}`);
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is you delicious pasta with: ${ing1}, ${ing2}, ${ing3}`);
  },

  // REST
  orderPizza(mainIngredient, ...otherIngredients) {
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

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

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

// // 1
// const [players1, players2] = game.players; // Arr destructuring
// // console.log(players1, players2);

// // 2
// const [goalkeeper1, ...fieldPlayers1] = players1; // REST
// const [goalkeeper2, ...fieldPlayers12] = players2;
// // console.log(goalkeeper1, fieldPlayers1);

// // 3
// const allPlayers = [...players1, ...players2]; // SPREAD
// // console.log(allPlayers);

// // 4
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic']; // SPREAD
// // console.log(players1Final);

// // 5
// const { team1, x: draw, team2 } = game.odds; // Object destructuring
// // console.log(team1, draw, team2);

// // 6
// function printGoals(...playerNames) {
//   console.log(`${playerNames} scored ${playerNames.length}`);
// }
// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich'); // REST, became an array in function
// printGoals(game.scored); // SPREAD Became a single String

// // 7
// console.log(
//   (game.odds.team1 < game.odds.team2 && game.team1) ||
//     (game.odds.team2 < game.odds.team1 && game.team2)
// ); // Circuit

/* --------------------------------------------- */

// For-of Loop

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// // equivaltent to 'for (let i=0; i<menu.length; i++)', but easier to write
// // able to use 'continue' and 'break' as well
// for (const item of menu) console.log(item);

// // to get index (0: index, 1: item)
// for (const [index, element] of menu.entries()) {
//   // console.log(index);
//   // console.log(element);

//   console.log(`${index + 1}: ${element}`);
// }

// console.log([...menu.entries()]);

/* --------------------------------------------- */

// Enhanced Object Literals

// const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// const openingHours = {
//   [weekdays[3]]: {
//     open: 12,
//     close: 22,
//   },
//   [weekdays[4]]: {
//     open: 11,
//     close: 23,
//   },
//   [`day-${2 + 4}`]: {
//     open: 0, // Open 24 hours
//     close: 24,
//   },
// };

// const testObject = {
//   testName: 'test',
//   openingHours,
//   // without ': function'
//   orderPasta(ing1, ing2, ing3) {
//     console.log(`Here is you delicious pasta with: ${ing1}, ${ing2}, ${ing3}`);
//   },
// };

// console.log(testObject);

/* --------------------------------------------- */

// Optional Chaining (?.)

// console.log(restaurant.openingHours?.mon?.open);
// console.log(restaurant.openingHours.mon?.open);

// // Example
// const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// for (const day of weekdays) {
//   // console.log(day);

//   const open = restaurant.openingHours[day]?.open ?? 'not open';

//   console.log(`on ${day}, we are open at ${open}`);
// }

// // Methods
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exists');
// console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exists');

// // Arrays
// const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];

// console.log(users[0]?.name ?? 'User array empty');

/* --------------------------------------------- */

// Looping Objects: keys, values and entries

// const { openingHours } = restaurant;

// Property NAMES
// const properties = Object.keys(openingHours);
// console.log(properties);
// let str = `We are open on ${properties.length}: `;
// // log key names in the object
// for (const day of properties) {
//   // console.log(day);
//   str += `${day}, `;
// }
// str += '.';

// // Property VALUES
// const values = Object.values(openingHours);
// console.log(values);

// // Entire Object
// const entries = Object.entries(openingHours);
// console.log(entries);

// for (const [key, { open, close }] of entries) {
//   console.log(`On ${key} we open at ${open} and close at ${close}`);
// }

/* --------------------------------------------- */

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// // 1
// const scored = Object.entries(game.scored);

// for (const [goal, name] of scored) {
//   console.log(`Goal ${Number(goal) + 1}: ${name}`);
// }

// // 2
// const odds = Object.values(game.odds);
// let avg = 0;

// for (const odd of odds) {
//   avg += odd / odds.length;
// }

// console.log(avg);

// // 3
// const odds2 = Object.entries(game.odds);

// for (const [key, odd] of odds2) {
//   const team = game[key] ?? key;
//   console.log(`Odd of victory ${team}: ${odd}`);
// }

// // BONUS
// let scorers = {};

// for (const player of game.scored) {
//   scorers[player] ? scorers[player]++ : (scorers[player] = 1);
// }
// console.log(scorers);

/* --------------------------------------------- */

// Sets

// iterable, elements are unique
// const ordersSet = new Set([
//   'Pasta',
//   'Pizza',
//   'Pizza',
//   'Risotto',
//   'Pasta',
//   'Pizza',
// ]);
// console.log(ordersSet); // repeated elements are deleted

// console.log(new Set('Jonas'));

// console.log(ordersSet.size);
// console.log(ordersSet.has('Pizza'));
// console.log(ordersSet.has('Bread'));
// ordersSet.add('Garlic Bread');
// ordersSet.add('Garlic Bread');
// console.log(ordersSet);

// ordersSet.delete('Risotto');
// // ordersSet.clear();
// console.log(ordersSet);

// for (const order of ordersSet) {
//   console.log(order);
// }

// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// const staffUnique = [...new Set(staff)]; // turn Set back to array, but with unique values
// console.log(staffUnique);

// console.log(new Set(staff).size);

/* --------------------------------------------- */

// Maps Fundamentals

// const rest = new Map();

// rest.set('name', 'Classical Italiano');
// rest.set(1, 'Firenze, Italy');
// rest.set(2, 'Lisbon, Portugal');

// rest
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('close', 23)
//   .set(true, 'We are open :D')
//   .set(false, 'We are closed :(');

// console.log(rest.get('name'));
// console.log(rest.get(true));
// console.log(rest.get(1));

// // console.log(rest);

// const time = 21;
// const res = rest.get(time > rest.get('open') && time < rest.get('close'));

// console.log(rest);

// console.log(rest.has('categories'));
// rest.delete(2);

// console.log(rest);
// console.log(rest.size);
// // rest.clear()

// const arr = [1, 2];
// rest.set(arr, 'Test'); // Object as key
// console.log(rest.get(arr));

// rest.set(document.querySelector('h1'), 'Heading'); // DOM element as key

// Maps Iteration

// this works as the same of using a chain of '.set'
// const question = new Map([
//   ['question', 'What is the best programming language in the world'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'Javascript'],
//   ['correct', 3],
//   [true, 'Correct!'],
//   [false, 'Try again!'],
// ]);

// console.log(question);

// // Convert Object to map
// console.log(Object.entries(restaurant.openingHours));
// const hoursMap = new Map(Object.entries(restaurant.openingHours));
// console.log(hoursMap);

// console.log(question.get('question'));
// for (const [key, value] of question) {
//   if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
// }

// const answer = 3; //Number(prompt('Your answer'));
// console.log(answer);

// const result = question.get(question.get('correct') === answer);

// console.log(result);

// // Convert Map to array
// console.log([...question]);
// // console.log(question.entries());
// console.log([...question.keys()]);
// console.log([...question.values()]);

/* --------------------------------------------- */

/* --------------------------------------------- */

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, 
and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1
const eventsOccured = new Set(gameEvents.values());
console.log(eventsOccured);

// 2
gameEvents.delete(64);
console.log(gameEvents);

// 3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);
const time = [...gameEvents.keys()].pop();
console.log(time);
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);

// 4
gameEvents.forEach((value, key) => {
  console.log(
    `${key < 45 ? '[FIRST HALF]' : '[SECOND HALF]'} ${key}: ${value}`
  );
});
