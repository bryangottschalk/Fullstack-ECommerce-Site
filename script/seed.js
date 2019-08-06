'use strict';
const { green, red } = require('chalk');
const db = require('../server/db');
const Faker = require('faker');
const Random = require('random-name');
const Sentencer = require('sentencer');
const ccGenerator = require('creditcard-generator');
const {
  User,
  Review,
  Order,
  Product,
  Category
} = require('../server/db/models');

const userGenerator = () => {
  let users = [];

  for (let i = 0; i < 10; i++) {
    let firstName = Random.first();
    let lastName = Random.last();
    let emailName = (
      firstName.toLowerCase().trim() +
      '.' +
      lastName.toLowerCase().trim()
    ).replace(/\s/g, '');
    users.push({
      firstName: firstName,
      lastName: lastName,
      email: `${emailName}@gmail.com`,
      imageUrl: `https://robohash.org/${firstName}--${lastName}`,
      isAdmin: false,
      creditCardNumber: ccGenerator.GenCC()[0],
      passwordResetTriggered: false,
      address: [Faker.address.streetAddress()],
      password: Faker.internet.password()
    });

    // generat reviews from that user
    // reviews.push({
    //   content: Faker.lorem.sentences(),
    //   star: Math.ceil(Math.random() * 5),
    //   userId: i + 1,
    //   productId: i + 1,
    //   userName: `${firstName} ${lastName}`,
    //   imageUrl: `https://robohash.org/${firstName}--${lastName}`
    // });
  }
  return users;
};

const users = userGenerator();

const productGenerator = () => {
  let products = [];
  for (let i = 0; i < 10; i++) {
    products.push({
      name: Faker.name.firstName(),
      imageUrl: Faker.image.animals(),
      description: Sentencer.make(
        'This product has {{ a_noun }} and {{ an_adjective }} {{ noun }} in it.'
      ),
      price: (1 + Math.random() * 300).toFixed(2),
      inventoryQuantity: Math.ceil(1 + Math.random() * 200),
      availability: true
    });
  }
  return products;
};

const products = productGenerator();

const reviewGenerator = () => {
  let reviews = [];
  for (let i = 0; i < 10; i++) {
    reviews.push({
      content: Faker.lorem.sentences(),
      star: Math.ceil(Math.random() * 5),
      userId: i + 1,
      productId: i + 1
    });
  }
  return reviews;
};

const reviews = reviewGenerator();
const orderStatus = ['Cart', 'Created', 'Processing', 'Cancelled', 'Completed'];

const orderGenerator = () => {
  let orders = [];
  for (let i = 0; i < 10; i++) {
    orders.push({
      total: (1 + Math.random() * 500).toFixed(2),
      status: orderStatus[Math.floor(Math.random() * 5)],
      shippingAddress: users[i].address[0],
      userId: i + 1
    });
  }
  return orders;
};

const orders = orderGenerator();

const categories = [
  { name: 'Dog' },
  { name: 'Cat' },
  { name: 'Reptile' },
  { name: 'Panda' },
  { name: 'Hamster' }
];

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  await User.create({
    email: 'cody.cody@email.com',
    password: '123',
    firstName: 'cody',
    lastName: 'cody',
    address: ['123 Road'],
    creditCardNumber: 999999999,
    imageUrl: `https://robohash.org/cody--cody`
  });

  await Order.create({
    total: 100.21,
    status: 'Created',
    shippingAddress: '123 Sunset Road',
    userId: 1,
    imageUrl: 'http://lorempixel.com/640/480/animals'
  });

  await Order.create({
    total: 23.55,
    status: 'Created',
    shippingAddress: '123 Sunset Road',
    userId: 1,
    imageUrl: 'http://lorempixel.com/640/480/animals'
  });

  await Promise.all(users.map(user => User.create(user)));
  await Promise.all(products.map(product => Product.create(product)));
  await Promise.all(orders.map(order => Order.create(order)));
  await Promise.all(categories.map(category => Category.create(category)));

  await Review.create({
    content: Faker.lorem.sentences(),
    star: Math.ceil(Math.random() * 5),
    userId: 1,
    productId: 1,
    userName: 'Cody Cody',
    imageUrl: 'https://robohash.org/cody--cody'
  });

  await Review.create({
    content: Faker.lorem.sentences(),
    star: Math.ceil(Math.random() * 5),
    userId: 1,
    productId: 1,
    userName: 'Cody Cody',
    imageUrl: 'https://robohash.org/cody--cody'
  });

  // Seed data for cart items and category items
  for (let i = 1; i <= 10; i++) {
    const price = (1 + Math.random() * 300).toFixed(2);
    const productName = Faker.name.firstName();
    const imageUrl = Faker.image.animals();
    const cartItem = await Product.create({
      name: productName,
      imageUrl: imageUrl,
      description: Sentencer.make(
        'This product has {{ a_noun }} and {{ an_adjective }} {{ noun }} in it.'
      ),
      price: (1 + Math.random() * 300).toFixed(2),
      inventoryQuantity: Math.ceil(1 + Math.random() * 200),
      availability: true
    });

    await Category.findByPk(Math.ceil(i / 2)).then(category => {
      category.addProduct(cartItem, {
        through: {
          quantity: Math.ceil(1 + Math.random() * 50),
          unitPrice: price,
          productName: productName,
          imageUrl: imageUrl
        }
      });
    });

    await Order.findByPk(i).then(order => {
      order.addProduct(cartItem, {
        through: {
          quantity: Math.ceil(1 + Math.random() * 50),
          unitPrice: price,
          productName: productName,
          imageUrl: imageUrl
        }
      });
    });
  }

  await Promise.all(reviews.map(review => Review.create(review)));
  console.log(green(`seeded successfully`));
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(red(err));
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

module.exports = seed;

if (module === require.main) {
  runSeed();
}
