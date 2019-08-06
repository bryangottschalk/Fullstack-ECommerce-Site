/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar';
export { default as allProducts } from './allProducts';
export { default as allUsers } from './allUsers';
export { default as UserHome } from './user-home';
export { default as SingleProduct } from './SingleProduct';
export { default as SingleUser } from './SingleUser';
export { default as FavoriteProducts } from './favoriteProducts';
export { default as Cart } from './cart';
export { default as NotFound } from './NotFound';
export { Login, Signup } from './auth-form';
