import React from 'react';
import {
  Button,
  Card,
  Image,
  Rating,
  Icon,
  Grid,
  Container
} from 'semantic-ui-react';

export const PastOrdersCard = props => {
  // console.log('quantity', props.order.products[0].quantity)
  // console.log('unit price', props.order.products[0].unitPrice)
  return (
    <div>
      <div>ID: {props.order.id}</div>
      <div>Order placed at: {props.order.createdAt}</div>
      <div>
        Items:
        {props.order.products.map(product => (
          <Grid key={product.id}>
            <Grid.Row>
              <Grid.Column width={15}>
                <img src="https://placekitten.com/300/300" />
              </Grid.Column>
              <Grid.Column width={15}>
                <div>Name: {product.name}</div>
                <div>Quantity: {product.ProductOrder.quantity}</div>
                <div>
                  Cost:{' '}
                  {product.ProductOrder.quantity *
                    product.ProductOrder.unitPrice}
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ))}
      </div>
    </div>
  );
};
