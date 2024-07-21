'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const calcAndDisplayBalance = account => {
  account.balance = account.movements.reduce(
    (acc, movement) => acc + movement,
    0
  );

  labelBalance.textContent = `${account.balance}€`;
};

const displayMovements = movements => {
  // clear initial elements (placeholders)
  containerMovements.innerHTML = '';

  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const sumMovements = (movements, income = true) =>
  movements
    .filter(mov => (income ? mov > 0 : mov < 0))
    .reduce((acc, mov) => acc + mov, 0);

const calcDisplaySummary = ({ movements, interestRate }) => {
  const incomes = sumMovements(movements);
  labelSumIn.textContent = `${incomes}€`;

  const outcome = sumMovements(movements, false);
  labelSumOut.textContent = `${Math.abs(outcome)}€`;

  const interest = movements
    .filter(movement => movement > 0)
    .reduce((acc, movement) => acc + (movement * interestRate) / 100, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsername = accounts => {
  accounts.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(word => word.at(0))
      .join('');
  });
};

createUsername(accounts);

// Event Handlers
let currentAccount;

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = accounts.find(
    account => account.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Welcom Message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner
      .split(' ')
      .at(0)}`;

    containerApp.style.opacity = 100;

    // Clear Input fields
    inputLoginUsername.value = inputLoginPin.value = ''; // empty string will assign to both
    inputLoginPin.blur(); // removes the focus

    // Display Movements
    displayMovements(currentAccount.movements);

    // Display Balance
    calcAndDisplayBalance(currentAccount);

    // Display Summary
    calcDisplaySummary(currentAccount);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);

  const receiverAccount = accounts.find(
    account => account.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount.username !== currentAccount.username
  ) {
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/* ----------------------------------------- */

// Simple Array Methods

// let arr = ['a', 'b', 'c', 'd', 'e'];

// // SLICE
// console.log(arr.slice(2)); // slice returns a new Array(a slice of it)
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice(1, 3));
// // shallow copy
// console.log(arr.slice());
// console.log([...arr]);

// // SPLICE
// // console.log(arr.splice(2)); // splice modifies the original Array
// arr.splice(-1); // removes last element
// console.log(arr);
// arr.splice(1, 2);
// console.log(arr);

// // REVERSE
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse()); // mutates the Array
// console.log(arr2);

// // CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// // JOIN
// console.log(letters.join(' - '));

/* ----------------------------------------- */

// The new at Method

// const arr = [23, 11, 64];

// console.log(arr[0]);
// console.log(arr.at(0));

// // they all get the last element, using 'at' is less verbose :D
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1)); // the new better way

// console.log('jonas'.at(0)); // output 'j'
// console.log('jonas'.at(-1)); // output 's'

// const matrix = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];

// console.log(matrix.at(-1).at(-1)); // Output: 9 (Last element of the last row)

/* ----------------------------------------- */

// Looping Arrays: forEach

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   // useful only if 'break' and 'continue' are necessary
//   if (movement > 0) console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   else console.log(`Movement ${i}: You withdrew ${Math.abs(movement)}`);
// }

// console.log('--------------------');

// // the third argument, is the array itself, useful for debugging or logging
// movements.forEach((movement, i) => {
//   if (movement > 0) console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   else console.log(`Movement ${i}: You withdrew ${Math.abs(movement)}`);
// });

/* ----------------------------------------- */

// forEach with Maps and Sets

// Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// // similar with Array
// currencies.forEach((currency, key, map) => {
//   console.log(`${key}: ${currency}`);
// });

// // Set
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);

// // the "key" here in Set is the same as the value, so unecessary to add
// currenciesUnique.forEach((currency, _, map) => {
//   console.log(`${key}: ${currency}`);
// });

/* ----------------------------------------- */

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, 
and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy.
 A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const checkDogs = (dogsJulia = [], dogsKate = []) => {
//   // 1
//   let dogsJuliaCopy = dogsJulia.slice(1, -2); // from index 0 to -2(the last two), negative end values make it go backwards
//   console.log(dogsJuliaCopy);

//   // 2
//   const dogsArr = dogsJuliaCopy.concat(dogsKate);

//   // 3
//   dogsArr.forEach((dog, i) => {
//     const customMessage =
//       dog >= 3 ? `is an adult, and is ${dog} years old` : `is still a puppy 🐶`;

//     console.log(`Dog number ${i + 1} ${customMessage}`);
//   });
// };

// // 4
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// console.log('------------------------------');
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

/* ----------------------------------------- */

// The map Method

//  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;

// const movementUsd = movements.map(movement => movement * eurToUsd);

// console.log(movements);
// console.log(movementUsd);

/* ----------------------------------------- */

// The filter method

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposits = movements.filter(movement => movement > 0);

// console.log(deposits);

// const withdrawals = movements.filter(movement => movement < 0);

// console.log(withdrawals);

/* ----------------------------------------- */

// The reduce method

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const totalDeposits = movements
//   .filter(movement => movement > 0)
//   .reduce((acc, movement) => acc + movement, 0);
// console.log(totalDeposits);

// const totalWithdrawal = movements
//   .filter(movement => movement < 0)
//   .reduce((acc, movement) => acc + movement, 0);
// console.log(totalWithdrawal);

// // Find Maximum
// const maxValue = movements.reduce(
//   (acc, movement) => (acc < movement ? movement : acc),
//   movements.at(0)
// );
// console.log(maxValue);

/* ----------------------------------------- */

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, 
they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', 
which accepts an arrays of dog's ages ('ages'), 
and does the following things in order:

1. Calculate the dog age in human years using the following formula: 
if the dog is <= 2 years old, humanAge = 2 * dogAge. 
If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// NOTE: avoid big chain, as it might become hard to read, add comments
// const calcAverageHumanAge = (dogs = []) => {
//   const averageHumanAge = dogs
//     .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4)) // Step 1: Convert to human age
//     .filter(humanAge => humanAge >= 18) // Step 2: Filter out non-adult dogs
//     .reduce((acc, age, _, arr) => acc + age / arr.length, 0); // Step 3: Calculate the average age

//   console.log(averageHumanAge); // Output the result
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]); // Test dataset 1
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]); // Test dataset 2

/* ----------------------------------------- */

// The find Method

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(firstWithdrawal);

// const account = accounts.find(account => account.owner === 'Jessica Davis');
// console.log(account);

/* ----------------------------------------- */
