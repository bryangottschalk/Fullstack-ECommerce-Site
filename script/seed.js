'use strict';
const { green, red } = require('chalk');
const db = require('../server/db');
const faker = require('Faker');
const Sentencer = require('sentencer');
const ccGenerator = require('creditcard-generator');
const { User, Review, Order, Product } = require('../server/db/models');

const userGenerator = () => {
  let users = [];
  for (let i = 0; i < 2; i++) {
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

const productGenerator = () => {
  let products = [];
  for (let i = 0; i < 1001; i++) {
    let productName = faker.commerce.productName();
    products.push({
      name: productName,
      category: faker.commerce.productAdjective(),
      imageUrl: faker.image.animals(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price(),
      inventoryQuantity: faker.random.number(),
      availability: true
    });
  }
  return products;
};

const reviewGenerator = () => {
  let reviews = [];
  for (let i = 0; i < 301; i++) {
    reviews.push({
      content: faker.lorem.sentences(),
      star: faker.random.number({ min: 0, max: 5 }),
      userId: faker.random.number({ min: 1, max: 1000 }),
      productId: faker.random.number({ min: 10, max: 1000 })
    });
  }
};

const users = userGenerator();
const products = productGenerator();
const productInfo = products[Math.floor(Math.random() * 1000)];

const orderGenerator = () => {
  let orders = [];
  for (let i = 0; i < 101; i++) {
    orders.push({
      total: faker.random.number({ min: 0, max: 10000, precision: 0.01 }),
      status: 'Completed',
      shippingAddress: users[Math.floor(Math.random() * 100)].address,
      productList: [`${productInfo.id}, ${productInfo.price}, 3 `]
    });
  }
};

const reviews = reviewGenerator();
const orders = orderGenerator();

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(users.map(user => User.create(user)));
    await Promise.all(products.map(product => Product.create(product)));
    await Promise.all(reviews.map(review => Review.create(review)));
    await Promise.all(orders.map(order => Order.create(order)));
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
