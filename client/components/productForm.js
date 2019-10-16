import React from 'react';
import { Form, Container, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addProductThunk, editProductThunk } from '../store/allProducts';
import { getCategoriesThunk } from '../store/categories';

class ProductForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      imageUrl: '',
      price: '',
      inventoryQuantity: '',
      availability: false
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

  componentDidUpdate(prevProps) {
    if (prevProps.categories !== this.props.categories) {
      const newCategories = this.props.categories.map(category => {
        const obj = {};
        obj.name = category.name;
        obj.value = false;
        return obj;
      });
      this.setState({ categories: newCategories });
    }

    if (prevProps.product !== this.props.product) {
      const product = this.props.product;
      this.setState({
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
        inventoryQuantity: product.inventoryQuantity
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.type === 'edit') {
      this.props.editProduct(this.state);
    } else {
      this.props.addProduct(this.state);
    }
    this.setState({
      name: '',
      description: '',
      imageUrl: '',
      price: '',
      inventoryQuantity: '',
      availability: false
    });
  }

  handleAvailabilityCheckbox() {
    this.setState({ availability: !this.state.availability });
  }

  async handleCategoryCheckbox(event) {
    const target = event.target.innerText;
    await this.setState(state => {
      state.categories.map(cat => {
        if (cat.name === target) {
          return { category: cat.name, value: !cat.value };
        } else {
          return { category: cat.name, value: cat.value };
        }
      });
    });
  }

  render() {
    const {
      name,
      description,
      imageUrl,
      price,
      inventoryQuantity,
      availability
    } = this.state;
    return (
      <Container>
        <Header size="huge" color="orange">
          Create New Product
        </Header>
        <Form onSubmit={this.handleSubmit} success={this.state.formSuccess}>
          <Form.Input
            width={10}
            fluid
            label="Name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={this.handleChange}
            required
          />

          <Form.Input
            width={10}
            label="Description"
            placeholder="Tell us more about this product"
            name="description"
            value={description}
            onChange={this.handleChange}
            required
          />

          <Form.Input
            width={10}
            fluid
            label="Image URL"
            placeholder="Image URL"
            required
            name="imageUrl"
            onChange={this.handleChange}
            value={imageUrl}
          />

          <Form.Input
            width={10}
            fluid
            label="Price"
            placeholder="Price"
            value={price}
            name="price"
            onChange={this.handleChange}
            required
          />

          <Form.Input
            width={10}
            fluid
            label="Inventory Quantity"
            placeholder="Quantity"
            name="inventoryQuantity"
            value={inventoryQuantity}
            onChange={this.handleChange}
            required
          />
          <Form.Group>
            <Form.Checkbox
              label="Available?"
              name="availability"
              value={availability}
              onChange={this.handleAvailabilityCheckbox}
            />
          </Form.Group>

          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    categories: state.categories,
    products: state.allProductsReducer
  };
};
const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(addProductThunk(product)),
  editProduct: product => dispatch(editProductThunk(product)),
  getCategories: () => dispatch(getCategoriesThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
