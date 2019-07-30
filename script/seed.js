'use strict';
const { green, red } = require('chalk');
const db = require('../server/db');
const faker = require('Faker');
const Sentencer = require('sentencer');
const ccGenerator = require('creditcard-generator');
const { User, Review, Order, Product } = require('../server/db/models');

const userGenerator = () => {
  let users = [];
  for (let i = 0; i < 10; i++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    users.push({
      firstName: firstName,
      lastName: lastName,
      email: `${firstName}.${lastName}@email.com`,
      imageUrl: faker.image.avatar(),
      isAdmin: false,
      authenticated: false,
      creditCardNumber: ccGenerator.GenCC()[0],
      passwordResetTriggered: false,
      address: faker.address.streetAddress(),
      password: faker.internet.password()
    });
  }
  return users;
};

const productGenerator = () => {};

const reviewGenerator = () => {};

// async function seed() {
//   await db.sync({ force: true });
//   console.log('db synced!');

//   const users = await Promise.all([
//     User.create({ email: 'cody@email.com', password: '123' }),
//     User.create({ email: 'murphy@email.com', password: '123' })

//   ]);

//   console.log(`seeded ${users.length} users`);
//   console.log(`seeded successfully`);
// }

const users = userGenerator();
console.log('USErs', users);

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(users.map(user => User.create(user)));
  } catch (error) {
    console.log(red(error));
  }
};
// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
