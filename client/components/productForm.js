import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addProductThunk } from '../store/allProducts';
import { runInThisContext } from 'vm';
import { getCategoriesThunk } from '.';

class ProductForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      imageUrl: '',
      price: '',
      inventoryQuantity: '',
      availability: false,
      categories: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAvailabilityCheckbox = this.handleAvailabilityCheckbox.bind(
      this
    );
    this.handleCategoryCheckbox = this.handleCategoryCheckbox.bind(this);
  }
  componentDidMount() {
    this.props.getCategories();
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
    this.setState({ formSucess: true });
  }

  handleAvailabilityCheckbox() {
    this.setState({ availability: !this.state.availability });
  }

  handleCategoryCheckbox(event) {
    console.log('EVENT TARGET', event.target);
    this.setState({
      categories: [...this.state.categories, event.target.name]
    });
    console.log('this.state', this.state);
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
    console.log('CATEGORIES', this.props.categories);
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
          <Form.Group widths="equal">
            <label>Categories</label>
            <Form.Checkbox
              label="Cat"
              name="Cat"
              value="Cat"
              onChange={this.handleCategoryCheckbox}
            />
            <Form.Checkbox
              label="Dog"
              name="Dog"
              value="Dog"
              onChange={this.handleCategoryCheckbox}
            />
          </Form.Group>
          <Form.Checkbox
            label="Available?"
            name="availability"
            value={availability}
            onChange={this.handleAvailabilityCheckbox}
          />
        </Form.Group>

        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}
const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};
const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(addProductThunk(product)),
  getCategories: () => dispatch(getCategoriesThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
