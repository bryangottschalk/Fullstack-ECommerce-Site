# Cody & Co Petstore - Fullstack Ecommerce Site

A fullstack ecommerce web application featuring a filterable product catalog, cart persistence and Stripe powered checkout for unauthenticated and authenticated users, and a route restricted account and order management portal for admin users. 

### Technologies

* PostgreSQL - Relational Database 
* Node.js - JavaScript runtime environment
* Express.js - Node.js framework
* Sequelize - ORM for Postgres
* React - Front end framework
* Redux - State management
* Semantic UI React - Styling Library 
* Stripe - Payment processing
* Passport - Authetication integration with Google accounts

## Setup 

Commands to get this repo set up for development:

```
npm install
createdb Graceshopper-app
npm run seed
npm run start-dev
```
open http://localhost:3030/
To log in as an admin (to see the admin functionality for the site), use the email "cody.cody@email.com". All users' passwords are 123.


## Team
* Bryan Gottschalk
* Kaiyue Pan
* Alexandra Kung
* Vera Krutsina

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
