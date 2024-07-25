'use strict';

// Constructor Functions and the new Operator

// don't use arrow function to create, as it does not have 'this'
// Prototype base approach
// const Person = function (firstName, birthYear) {
//   // instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   // NEVER do this
//   //   this.calcAge = function() {
//   //     console.log(2037 - this.birthYear);
//   //   }
// };

// // class Person {
// //     constructor(firstName, birthYear) {
// //       this.firstName = firstName;
// //       this.birthYear = birthYear;
// //       console.log(this);
// //     }
// //   }

// const jonas = new Person('Jonas', 1991);
// console.log(jonas);

// // 1. New {} is created
// // 2. functions is called, this = {}
// // 3. {} linked to prototype
// // 4. function automatically return {}

// const matilda = new Person('Matilda', 2017);
// const jack = new Person('Jack', 1975);
// console.log(matilda, jack);

// const jay = 'Jay';

// console.log(jonas instanceof Person);
// console.log(jay instanceof Person); // this will return false

// /* ------------------------------------------------ */

// // Prototypes
// console.log(Person.prototype);

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// jonas.calcAge();
// matilda.calcAge();

// console.log(jonas.__proto__);
// console.log(jonas.__proto__ === Person.prototype);

// // could be named(it is not): .prototypeOfLinkedObjects
// console.log(Person.prototype.isPrototypeOf(jonas));
// console.log(Person.prototype.isPrototypeOf(Person));

// Person.prototype.species = 'Homo Sapiens';
// console.log(jonas.species, matilda.species);

// console.log(jonas.hasOwnProperty('firstName'));
// console.log(jonas.hasOwnProperty('species'));

// /* ------------------------------------------------ */

// // Prototypal Inheritance on Built-In Objects

// console.log(jonas.__proto__);
// // Object.prototype (top of prototype chain)
// console.log(jonas.__proto__.__proto__);
// console.log(jonas.__proto__.__proto__.__proto__);

// console.dir(Person.prototype.constructor);

// const arr = [3, 4, 6, 8, 3, 2, 6, 8]; // same as new Array
// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype);

// console.log(arr.__proto__.__proto__);

// // DON'T do this
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique());

// const h1 = document.querySelector('h1');
// console.dir(h1);

// /* ------------------------------------------------ */

// ///////////////////////////////////////
// // Coding Challenge #1

// /*
// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

// DATA CAR 1: 'BMW' going at 120 km/h
// DATA CAR 2: 'Mercedes' going at 95 km/h

// GOOD LUCK 😀
// */

// class Car {
//   // 1
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
// }

// // 2
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(this.speed);
// };

// // 3
// Car.prototype.break = function () {
//   this.speed -= 5;
//   console.log(this.speed);
// };

// // const aCar = new Car('Ford', 20);

// // aCar.accelerate();
// // aCar.accelerate();
// // aCar.break();

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);

// bmw.accelerate();
// bmw.accelerate();
// bmw.accelerate();
// bmw.break();

// mercedes.break();
// mercedes.accelerate();

/* ------------------------------------------------ */

// ES6 Classes

// behind the scenes, class is a 'special' function

// class expression
// const PersonCl = class {

// }

// class declaration
// writing classes are cleaner
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Instance Methods
//   // Methods will be added to .prototype property
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey ${this.fullName}`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   // Set a property that already exists
//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     // when dealing with variables with same name, add _
//     else alert`${name} is not a full name!`;
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // Static Methods
//   static hey() {
//     console.log('Hey there :D');
//     console.log(this);
//   }
// }

// const jessica = new PersonCl('Jessica Davis', 1996);
// console.log(jessica);

// jessica.calcAge();

// console.log(jessica.__proto__ === PersonCl.prototype);

// // PersonCl.prototype.greet = function () {
// //     console.log(`Hey ${this.firstName}`);
// // }

// jessica.greet();

// // 1. Classes ar NOT hoisted, you can't use its functions unless from an object from it
// // 2. Class are first class citizens
// // 3. Classes are executed in strict mode

// /* ------------------------------------------------ */

// // Setters and Getters

// const account = {
//   owner: 'Jonas',
//   movements: [200, 530, 120, 300],

//   get latest() {
//     return this.movements.slice(-1).pop();
//   },
//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };

// // call it as if it was a property, crazy huh?
// console.log(account.latest);
// account.latest = 50;

// console.log(jessica.age);

// console.log(jessica.fullName);

// const walter = new PersonCl('Walter White', 1965);

// /* ------------------------------------------------ */

// // Static Methods

// // methods only available to the constructor
// // example: Array.from Number.parseFloat

// // PersonCl.hey = function () {
// //   console.log('Hey there :D');
// //   console.log(this);
// // };

// PersonCl.hey();

// /* ------------------------------------------------ */

// // Object.create

// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);
// console.log(steven);
// steven.name = 'Steven';
// steven.birthYear = 2002;
// steven.calcAge();

// const sarah = Object.create(PersonProto);
// sarah.init('Sarah', 1979);
// sarah.calcAge();

/* ------------------------------------------------ */

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// 1
// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelate() {
//     this.speed += 10;
//     console.log(this.speed);
//   }

//   break() {
//     this.speed -= 5;
//     console.log(this.speed);
//   }

//   get speedUs() {
//     return this.speed / 1.6;
//   }

//   set speedUs(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const ford = new Car('Ford', 120);

// console.log(ford.speedUs);

// ford.speedUs = 120;

// console.log(ford.speedUs);

// ford.accelate();
// ford.accelate();
// ford.break();

// console.log(ford);

/* ------------------------------------------------ */

// Inheritance Between "Classes": Constructor Functions

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// // Inherits from Person
// const Student = function (firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };

// // Student prototype now inherits from Person prototype / Linking
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// const mike = new Student('Mike', 2020, 'Computer Science');
// mike.introduce();

// mike.calcAge(); // possible afer liking the prototypes

/* ------------------------------------------------ */

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(this.speed);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(this.speed);
//   }

//   get speedUs() {
//     return this.speed / 1.6;
//   }

//   set speedUs(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(this.speed);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(this.speed);
// };

// // 1
// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge -= 1;
//   console.log(
//     `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
//   );
// };

// const ev = new EV('Tesla', 120, 23);

// ev.accelerate();
// ev.brake();
// ev.chargeBattery(90);

// console.log(ev);

/* ------------------------------------------------ */

// Inheritance Between "Classes": ES6 Classes

// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey ${this.fullName}`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert`${name} is not a full name!`;
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // Static Methods
//   static hey() {
//     console.log('Hey there :D');
//     console.log(this);
//   }
// }

// class StudentCl extends PersonCl {
//   constructor(fullName, birthYear, course) {
//     // always call super first
//     super(fullName, birthYear);
//     this.course = course;
//   }

//   introduce() {
//     console.log(`My name is ${this.fullName} and I study ${this.course}`);
//   }

//   // polymorphism :D
//   calcAge() {
//     console.log(
//       `I'm ${
//         2037 - this.birthYear
//       } years old, but as a student I feel more like ${
//         2037 - this.birthYear + 10
//       }`
//     );
//   }
// }

// const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
// console.log(martha);

// martha.introduce();
// martha.calcAge();

/* ------------------------------------------------ */

// Inheritance Between "Classes" : prototype

// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);

// const StudentProto = Object.create(PersonProto);

// StudentProto.init = function (firstName, birthYear, course) {
//   PersonProto.init.call(this, firstName, birthYear);
//   this.course = course;
// };

// StudentProto.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// const jay = Object.create(StudentProto);
// jay.init('Jay', 2010, 'Computer Science');
// jay.introduce();
// jay.calcAge();

/* ------------------------------------------------ */

class Account {
  // Public fields
  locale = navigator.language;

  // Private fields, defined by #
  #pin;
  #movements = [];

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // predefined variables
    // this.#movements = []; // not truly private, PROTECTED property, should not be used outside
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account ${this.owner}`);
  }

  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this; // will allow chaining
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  // static can only be used by the class itself
  static helper() {
    console.log('Helper!');
  }

  // private function # / protected --> _
  #approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
      return this;
    }
  }
}

const acc1 = new Account('Jonas', 'Eur', 1111);
console.log(acc1);

// CORRECT
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);

console.log(acc1.getMovements());

Account.helper();

// Chaining
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);

console.log(acc1.getMovements());

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(this.speed);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(this.speed);
//   }

//   get speedUs() {
//     return this.speed / 1.6;
//   }

//   set speedUs(speed) {
//     this.speed = speed * 1.6;
//   }
// }

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

// 1
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const ev = new EV('Tesla', 120, 23);

ev.accelerate();
ev.brake();
ev.chargeBattery(90);

console.log(ev);
