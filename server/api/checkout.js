const router = require('express').Router();
const stripe = require('stripe')('sk_test_6hkoKosKXHdbu3WXT69EvCBZ00o1rRZC5s');
const uuid = require('uuid/v4');
module.exports = router;

router.get('/', (req, res) => {
  res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
});

router.post('/', async (req, res) => {
  console.log('**********');
  console.log('Request:', req.body);

  let error;
  let status;
  try {
    const { total, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: total,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    );
    console.log('Charge:', { charge });
    status = 'success';
  } catch (error) {
    console.error('Error:', error);
    status = 'failure';
  }

  res.json({ error, status });
});
