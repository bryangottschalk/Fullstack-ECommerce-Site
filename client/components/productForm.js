import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addProductThunk } from '../store/allProducts';

class ProductForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      imageUrl: '',
      price: '',
      inventoryQuantity: '',
      availability: true,
      categories: [],
      formSuccess: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    console.log('inside handle change');
    console.log('event.target', event.target);
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
    console.log('inside handle submit');
    event.preventDefault();
    this.props.addProduct(this.state);
  }
  render() {
    const {
      name,
      description,
      imageUrl,
      price,
      inventoryQuantity,
      availability,
      categories
    } = this.state;
    console.log('HI');
    return (
      <Form onSubmit={this.handleSubmit} success={this.state.formSuccess}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={this.handleChange}
            required
          />
          <Form.TextArea
            label="Description"
            placeholder="Tell us more about this product"
            name="description"
            value={description}
            onChange={this.handleChange}
            required
          />
          <Form.Input
            fluid
            label="Image URL"
            placeholder="Image URL"
            required
            name="imageUrl"
            onChange={this.handleChange}
            value={imageUrl}
          />
          <Form.Input
            fluid
            label="Price"
            placeholder="Price"
            value={price}
            name="price"
            onChange={this.handleChange}
            required
          />
          <Form.Input
            fluid
            label="Inventory Quantity"
            placeholder="Quantity"
            name="inventoryQuantity"
            value={inventoryQuantity}
            onChange={this.handleChange}
            required
          />
          <Form.Checkbox label="Available?" />
        </Form.Group>
        {/* <Message success header='Form Completed' content="You're all signed up for the newsletter" /> */}
        <Form.Button>Submit</Form.Button>
      </Form>
      // <div>
      //     <form className="ui form">
      //         <div className="field">
      //             <label> Product name</label>
      //             <input type="text" name="product-name" placeholder="Product name" value={this.state.name} />
      //         </div>
      //         <div className="field">
      //             <label>Description</label>
      //             <textarea value={this.state.description} />
      //         </div>
      //         <div className="field">
      //             <label>Image url</label>
      //             <input type="text" name="image-url" placeholder="Image url" value={this.state.imageUrl} />
      //         </div>
      //         <div className="field">
      //             <label>Price</label>
      //             <input type="text" name="price" placeholder="Price" value={this.state.price} />
      //         </div>
      //         {/* <div className="ui checkbox">
      //             <input type="checkbox" name="available" tabIndex="0" className="hidden" />
      //             <label>Available</label>
      //         </div>
      //          */}

      //     </form>
      // </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(addProductThunk(product))
});

export default connect(null, mapDispatchToProps)(ProductForm);
