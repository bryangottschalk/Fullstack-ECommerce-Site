import React from 'react';
function NotFound() {
  return (
    <div>
      <p>This page was not found...</p>
      <p>Check out our all products page to browse our selection!</p>
      <h2>
        {' '}
        <a href="/products"> View all products</a>
      </h2>

      <img src="http://placekitten.com/500/500" />
    </div>
  );
}

export default NotFound;
